from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from huggingface_hub import InferenceClient
import os

from core.serializers import ProgramSerializer
from core.models import Program

def chat(request):
    # Initialize empty chat history in session if it doesn't exist
    request.session['chat_history'] = []
    # if 'chat_history' not in request.session:
    return render(request, 'chatgptwo/chat.html')

@csrf_exempt
def generate(request):
    if request.method == 'POST':
        # Handle both form data and JSON data
        if request.content_type == 'application/json':
            import json
            data = json.loads(request.body)
            message = data.get('message', '')
        else:
            message = request.POST.get('message', '')
        print(f"Received message: {message}")
        # Get chat history from session or initialize if not exists
        chat_history = request.session.get('chat_history', [])
        
        # Add user message to history
        chat_history.append({"role": "user", "content": message})
        
        API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")
        if API_TOKEN is None:
            return JsonResponse({'response': 'API token not found'})
        
        try:
            client = InferenceClient(
                provider="novita",
                api_key=API_TOKEN,
            )
            
            # Include full chat history in the request
            messages = [
                {"role": "system", "content": "you are a helpful assistant in an app store website, you can answer questions about the apps and help users find what they need. you have access to the following apps: "},
                {"role": "system", "content": "".join(["title: " + program.title + " slug (use to construct link): " + program.slug + " category: " + program.category.name  for program in Program.objects.all()])},
                {"role": "system", "content": "the base for all app links should be http://localhost:5173/details/_/"}
            ] + chat_history
            print(messages)
            
            generated_text = client.chat.completions.create(
                model="meta-llama/Llama-3.2-3B-Instruct",
                messages=messages,
                max_tokens=200,
                temperature=0.7,
                top_p=0.9,
                frequency_penalty=0.1,
                presence_penalty=0.1,
            )
            
            # Add assistant's response to history
            chat_history.append({
                "role": "assistant", 
                "content": generated_text.choices[0].message.content
            })
            
            # Save updated history to session (limit to last 10 messages to prevent session overflow)
            request.session['chat_history'] = chat_history[-10:]
            request.session.modified = True
            
            return JsonResponse({'response': generated_text})
                
        except Exception as e:
            return JsonResponse({'response': f'An error occurred: {str(e)}'})
    
    return JsonResponse({'response': 'Invalid request method'})
