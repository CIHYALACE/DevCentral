import os
import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from core.models import Category, Program, Media, Review, Book, Author
from django.conf import settings

media = os.listdir("./media/media")
media.remove("video.mp4")
icons = os.listdir("./media/icons")
book_covers = os.listdir("./media/book_covers")


User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database seeding...'))
        
        # Create categories
        self.create_categories()
        
        # Create users first (moved from create_reviews)
        self.create_users()
        
        # Create programs (apps and games)
        self.create_programs()
        
        # Create reviews
        self.create_reviews()

        # Create authors
        self.create_authors()

        # Create books
        self.create_books()
        
        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully!'))
    
    def create_categories(self):
        self.stdout.write('Creating categories...')
        
        # App categories
        app_categories = [
            'Productivity', 
            'Education', 
            'Health & Fitness', 
            'Social Networking', 
            'Entertainment',
            'Utilities',
            'Photography',
            'Finance',
            'Travel',
            'Food & Drink'
        ]
        
        # Game categories
        game_categories = [
            'Action',
            'Adventure',
            'Arcade',
            'Board',
            'Card',
            'Casino',
            'Casual',
            'Educational',
            'Music',
            'Puzzle',
            'Racing',
            'Role Playing',
            'Simulation',
            'Sports',
            'Strategy',
            'Trivia',
            'Word'
        ]
        
        # Create app categories
        for category_name in app_categories:
            Category.objects.get_or_create(
                name=category_name,
                related_type='app'
            )
            self.stdout.write(f'  Created app category: {category_name}')
        
        # Create game categories
        for category_name in game_categories:
            Category.objects.get_or_create(
                name=category_name,
                related_type='game'
            )
            self.stdout.write(f'  Created game category: {category_name}')
    
    def create_users(self):
        self.stdout.write('Creating users...')
        
        # Ensure we have at least one admin user
        admin_user, created = User.objects.get_or_create(
            email='admin@admin.com',
            defaults={
                'name': 'Admin',
                'is_active': True,
                'is_staff': True,
                'is_superuser': True,
                'role': 'admin',
            },
        )
        
        if created:
            admin_user.set_password('admin')
            admin_user.save()
            self.stdout.write('  Created admin user: admin@admin.com (password: admin)')
        
        # Create developer users
        developer_emails = [
            'productivity@example.com',
            'educational@example.com',
            'fitness@example.com',
            'social@example.com',
            'entertainment@example.com',
            'utility@example.com',
            'photography@example.com',
            'finance@example.com',
            'travel@example.com',
            'food@example.com',
            'adventure@example.com',
            'action@example.com',
            'puzzle@example.com',
            'racing@example.com',
            'strategy@example.com'
        ]
        
        self.developers = []
        for i, email in enumerate(developer_emails):
            name = email.split('@')[0].title()
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'name': f'{name} Developer',
                    'is_active': True,
                    'role': 'developer',
                }
            )
            
            if created:
                user.set_password(f'password')
                user.save()
                self.stdout.write(f'  Created developer user: {email} (password: password)')
            
            self.developers.append(user)
        
        # Create regular users if needed
        self.users = list(User.objects.all())
        if len(self.users) < 10:
            for i in range(1, 6):
                user, created = User.objects.get_or_create(
                    email=f'user{i}@example.com',
                    defaults={
                        'name': f'User {i}',
                        'is_active': True,
                        'role':'user'
                    }
                )
                
                if created:
                    user.set_password(f'password')
                    user.save()
                    self.users.append(user)
                    self.stdout.write(f'  Created user: user{i}@example.com (password: password)')
    
    def create_programs(self):
        self.stdout.write('Creating programs (apps and games)...')
        
        # Sample apps data
        apps_data = [
            {
                'title': 'Productivity Pro',
                'description': 'Boost your productivity with this all-in-one task manager, calendar, and note-taking app.',
                'developer': self.developers[0],  # Using user object instead of string
                'category_name': 'Productivity',
                'price': 4.99,
                'rating': 4.7,
                'download_count': 1500000,
            },
            {
                'title': 'Language Master',
                'description': 'Learn new languages with interactive lessons, quizzes, and speech recognition.',
                'developer': self.developers[1],
                'category_name': 'Education',
                'price': 0.00,
                'rating': 4.8,
                'download_count': 5000000,
            },
            {
                'title': 'Fitness Tracker',
                'description': 'Track your workouts, monitor your progress, and achieve your fitness goals.',
                'developer': self.developers[2],
                'category_name': 'Health & Fitness',
                'price': 2.99,
                'rating': 4.5,
                'download_count': 3000000,
            },
            {
                'title': 'Social Connect',
                'description': 'Stay connected with friends and family through messages, photos, and video calls.',
                'developer': self.developers[3],
                'category_name': 'Social Networking',
                'price': 0.00,
                'rating': 4.2,
                'download_count': 10000000,
            },
            {
                'title': 'Movie Stream',
                'description': 'Watch thousands of movies and TV shows on your device.',
                'developer': self.developers[4],
                'category_name': 'Entertainment',
                'price': 9.99,
                'rating': 4.6,
                'download_count': 8000000,
            },
            {
                'title': 'File Manager',
                'description': 'Organize, manage, and secure your files with this powerful file manager.',
                'developer': self.developers[5],
                'category_name': 'Utilities',
                'price': 0.00,
                'rating': 4.3,
                'download_count': 2000000,
            },
            {
                'title': 'Photo Editor Pro',
                'description': 'Edit your photos with professional tools, filters, and effects.',
                'developer': self.developers[6],
                'category_name': 'Photography',
                'price': 3.99,
                'rating': 4.4,
                'download_count': 4000000,
            },
            {
                'title': 'Budget Planner',
                'description': 'Take control of your finances with this comprehensive budget planning app.',
                'developer': self.developers[7],
                'category_name': 'Finance',
                'price': 1.99,
                'rating': 4.5,
                'download_count': 1000000,
            },
            {
                'title': 'Travel Guide',
                'description': 'Discover new destinations, plan your trips, and find the best places to visit.',
                'developer': self.developers[8],
                'category_name': 'Travel',
                'price': 0.00,
                'rating': 4.1,
                'download_count': 3500000,
            },
            {
                'title': 'Recipe Finder',
                'description': 'Find and save thousands of recipes, create shopping lists, and plan your meals.',
                'developer': self.developers[9],
                'category_name': 'Food & Drink',
                'price': 0.00,
                'rating': 4.7,
                'download_count': 2500000,
            },
        ]
        
        # Sample games data
        games_data = [
            {
                'title': 'Epic Adventure',
                'description': 'Embark on an epic adventure in a vast open world filled with quests, monsters, and treasures.',
                'developer': self.developers[10],
                'category_name': 'Adventure',
                'price': 0.00,
                'rating': 4.9,
                'download_count': 12000000,
            },
            {
                'title': 'Space Shooter',
                'description': 'Defend the galaxy from alien invaders in this action-packed space shooter.',
                'developer': self.developers[11],
                'category_name': 'Action',
                'price': 0.00,
                'rating': 4.6,
                'download_count': 8000000,
            },
            {
                'title': 'Puzzle Master',
                'description': 'Challenge your brain with hundreds of puzzles of increasing difficulty.',
                'developer': self.developers[12],
                'category_name': 'Puzzle',
                'price': 1.99,
                'rating': 4.8,
                'download_count': 5000000,
            },
            {
                'title': 'Racing Champions',
                'description': 'Race against opponents on tracks around the world with realistic physics and graphics.',
                'developer': self.developers[13],
                'category_name': 'Racing',
                'price': 4.99,
                'rating': 4.7,
                'download_count': 7000000,
            },
            {
                'title': 'Word Challenge',
                'description': 'Test your vocabulary and spelling skills with this addictive word game.',
                'developer': self.developers[13],
                'category_name': 'Word',
                'price': 0.00,
                'rating': 4.5,
                'download_count': 3000000,
            },
            {
                'title': 'Strategy Empire',
                'description': 'Build your empire, train your army, and conquer your enemies in this strategic game.',
                'developer': self.developers[14],
                'category_name': 'Strategy',
                'price': 2.99,
                'rating': 4.6,
                'download_count': 4000000,
            },
            {
                'title': 'Sports League',
                'description': 'Compete in various sports with realistic gameplay and multiplayer modes.',
                'developer': self.developers[13],
                'category_name': 'Sports',
                'price': 3.99,
                'rating': 4.4,
                'download_count': 6000000,
            },
            {
                'title': 'Arcade Classic',
                'description': 'Enjoy classic arcade games with modern graphics and controls.',
                'developer': self.developers[13],
                'category_name': 'Arcade',
                'price': 0.00,
                'rating': 4.3,
                'download_count': 2000000,
            },
            {
                'title': 'Simulation City',
                'description': 'Build and manage your own city with realistic simulation mechanics.',
                'developer': self.developers[13],
                'category_name': 'Simulation',
                'price': 5.99,
                'rating': 4.8,
                'download_count': 9000000,
            },
            {
                'title': 'Role Playing Quest',
                'description': 'Create your character, level up, and embark on an epic quest in this RPG.',
                'developer': self.developers[13],
                'category_name': 'Role Playing',
                'price': 0.00,
                'rating': 4.9,
                'download_count': 15000000,
            },
        ]
        
        # Create apps
        for app_data in apps_data:
            self._create_program(app_data, 'app')
        
        # Create games
        for game_data in games_data:
            self._create_program(game_data, 'game')


    def _create_program(self, data, program_type):
        title = data['title']
        slug = slugify(title)
        
        # Get or create category
        try:
            category = Category.objects.get(name=data['category_name'], related_type=program_type)
        except Category.DoesNotExist:
            self.stdout.write(self.style.WARNING(f"Category {data['category_name']} for {program_type} not found. Skipping {title}."))
            return
        
        # Random dates
        release_date = datetime.now().date() - timedelta(days=random.randint(30, 365))
        last_update_date = release_date + timedelta(days=random.randint(1, 30))
        
        # Create program
        program, created = Program.objects.get_or_create(
            slug=slug,
            defaults={
                'title': title,
                'description': data['description'],
                'type': program_type,
                'category': category,
                'developer': data['developer'],
                'release_date': release_date,
                'last_update_date': last_update_date,
                'price': data['price'],
                'rating': data['rating'],
                'download_count': data['download_count'],
                'icon': f'icons/{random.choice(icons)}',  # Placeholder
                'download_url': f'https://example.com/download/{slug}',
                'is_published': True,
            }
        )
        
        if created:
            self.stdout.write(f"  Created {program_type}: {title}")
            
            # Create media for the program
            self._create_media(program)
        else:
            self.stdout.write(f"  {program_type.capitalize()} already exists: {title}")

    def _create_media(self, program):
        # Create screenshots
        for i in range(1, 4):
            Media.objects.create(
                program=program,
                media_type='screenshot',
                file=f'media/{random.choice(media)}'  # Placeholder
            )
        
        # Create banner
        Media.objects.create(
            program=program,
            media_type='banner',
            file=f'media/{random.choice(media)}'  # Placeholder
        )
        
        # Create video for some programs
        if random.choice([True, False]):
            Media.objects.create(
                program=program,
                media_type='video',
                file='/media/video.mp4'  # Placeholder
            )
    
    def create_reviews(self):
        self.stdout.write('Creating reviews...')
        
        # Add reviews to programs
        programs = Program.objects.all()
        
        for program in programs:
            # Add 3-10 reviews per program
            num_reviews = random.randint(3, 10)
            
            for _ in range(num_reviews):
                user = random.choice(self.users)
                score = random.randint(3, 5)  # Mostly positive reviews (3-5 stars)
                
                # Skip if this user already reviewed this program
                if Review.objects.filter(program=program, user=user).exists():
                    continue
                
                comments = [
                    "Great app, highly recommended!",
                    "Works perfectly, very satisfied.",
                    "Excellent user interface and functionality.",
                    "Good app but could use some improvements.",
                    "Very useful, use it every day.",
                    "One of the best apps in this category.",
                    "Easy to use and very intuitive.",
                    "I hate this app and my life",
                    "I hate this app and my life",
                    "I hate this app and my life",
                    "I hate this app and my life",
                    "I hate this app and my life",
                    "I hate this app and my life",
                    "I hate this app and my life",
                    "I hate this app and my life",
                    "Amazing features and performance.",
                    "Decent app, worth the download.",
                    "Impressive design and functionality."
                ]
                
                Review.objects.create(
                    program=program,
                    user=user,
                    score=score,
                    comment=random.choice(comments)
                )
            
            self.stdout.write(f"  Added {num_reviews} reviews to: {program.title}")

    def create_authors(self):
        self.stdout.write('Creating authors...')
        author_names = [
            "J.K. Rowling",
            "George R.R. Martin",
            "J.R.R. Tolkien",
            "Agatha Christie",
            "Stephen King",
            "Isaac Asimov",
            "Jane Austen",
            "Mark Twain",
            "Charles Dickens",
            "Ernest Hemingway"
        ]

        self.authors = []
        for name in author_names:
            author, created = Author.objects.get_or_create(
                name=name,
                defaults={
                    "bio": f"{name} is a renowned author known for their works.",
                    "website": f"https://{slugify(name)}.com"
                }
            )
            if created:
                self.stdout.write(f"  Created author: {name}")
            self.authors.append(author)

    def create_books(self):
        self.stdout.write('Creating books...')
        book_data = [
            {
                "title": "The Lean Startup",
                "author": self.authors[0],
                "category_name": "Business",
                "description": "A guide to building a successful startup using lean principles.",
                "publish_date": datetime.now() - timedelta(days=30),  # Published 30 days ago
                "rating": 4.7
            },
            {
                "title": "AI Revolution",
                "author": self.authors[1],
                "category_name": "New Release",
                "description": "Exploring the future of artificial intelligence.",
                "publish_date": datetime.now() - timedelta(days=15),  # Published 15 days ago
                "rating": 4.8
            },
            {
                "title": "The Modern Startup",
                "author": self.authors[2],
                "category_name": "New Release",
                "description": "A guide to building a modern startup.",
                "publish_date": datetime.now() - timedelta(days=10),  # Published 10 days ago
                "rating": 4.6
            },
            {
                "title": "The Modern Startup2",
                "author": self.authors[2],
                "category_name": "New Release",
                "description": "A guide to building a modern startup.",
                "publish_date": datetime.now() - timedelta(days=10),  # Published 10 days ago
                "rating": 4.6
            },
            {
                "title": "Future of Tech",
                "author": self.authors[3],
                "category_name": "New Release",
                "description": "A deep dive into the future of technology.",
                "publish_date": datetime.now() - timedelta(days=5),  # Published 5 days ago
                "rating": 4.9
            },
            {
                "title": "Innovative Minds",
                "author": self.authors[4],
                "category_name": "New Release",
                "description": "Stories of innovation and creativity.",
                "publish_date": datetime.now(),  # Published today
                "rating": 4.7
            }
        ]

        for data in book_data:
            # Fetch or create the category
            category, created = Category.objects.get_or_create(
                name=data["category_name"],
                defaults={"related_type": "book"}  # Assuming "book" is the related type for books
            )
            if created:
                self.stdout.write(f"  Created category: {category.name}")

            # Create the book
            slug = slugify(data["title"])
            book, created = Book.objects.get_or_create(
                slug=slug,
                defaults={
                    "title": data["title"],
                    "author": data["author"],
                    "category": category,  # Use the Category instance
                    "description": data["description"],
                    "publish_date": data["publish_date"],
                    "rating": data["rating"],
                    "cover_image": f'book_covers/{random.choice(book_covers)}',
                }
            )
            if created:
                self.stdout.write(f"  Created book: {data['title']}")
            else:
                self.stdout.write(f"  Book already exists: {data['title']}")
