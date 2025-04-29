import os
import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from core.models import Category, Program, Media, Review
from django.conf import settings

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database seeding...'))
        
        # Create categories
        self.create_categories()
        
        # Create programs (apps and games)
        self.create_programs()
        
        # Create reviews
        self.create_reviews()
        
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
    
    def create_programs(self):
        self.stdout.write('Creating programs (apps and games)...')
        
        # Sample apps data
        apps_data = [
            {
                'title': 'Productivity Pro',
                'description': 'Boost your productivity with this all-in-one task manager, calendar, and note-taking app.',
                'developer': 'Productivity Solutions Inc.',
                'category_name': 'Productivity',
                'price': 4.99,
                'rating': 4.7,
                'download_count': 1500000,
            },
            {
                'title': 'Language Master',
                'description': 'Learn new languages with interactive lessons, quizzes, and speech recognition.',
                'developer': 'Educational Apps Ltd.',
                'category_name': 'Education',
                'price': 0.00,
                'rating': 4.8,
                'download_count': 5000000,
            },
            {
                'title': 'Fitness Tracker',
                'description': 'Track your workouts, monitor your progress, and achieve your fitness goals.',
                'developer': 'Health & Fitness Apps',
                'category_name': 'Health & Fitness',
                'price': 2.99,
                'rating': 4.5,
                'download_count': 3000000,
            },
            {
                'title': 'Social Connect',
                'description': 'Stay connected with friends and family through messages, photos, and video calls.',
                'developer': 'Social Media Inc.',
                'category_name': 'Social Networking',
                'price': 0.00,
                'rating': 4.2,
                'download_count': 10000000,
            },
            {
                'title': 'Movie Stream',
                'description': 'Watch thousands of movies and TV shows on your device.',
                'developer': 'Entertainment Studios',
                'category_name': 'Entertainment',
                'price': 9.99,
                'rating': 4.6,
                'download_count': 8000000,
            },
            {
                'title': 'File Manager',
                'description': 'Organize, manage, and secure your files with this powerful file manager.',
                'developer': 'Utility Apps Co.',
                'category_name': 'Utilities',
                'price': 0.00,
                'rating': 4.3,
                'download_count': 2000000,
            },
            {
                'title': 'Photo Editor Pro',
                'description': 'Edit your photos with professional tools, filters, and effects.',
                'developer': 'Photography Apps',
                'category_name': 'Photography',
                'price': 3.99,
                'rating': 4.4,
                'download_count': 4000000,
            },
            {
                'title': 'Budget Planner',
                'description': 'Take control of your finances with this comprehensive budget planning app.',
                'developer': 'Financial Solutions',
                'category_name': 'Finance',
                'price': 1.99,
                'rating': 4.5,
                'download_count': 1000000,
            },
            {
                'title': 'Travel Guide',
                'description': 'Discover new destinations, plan your trips, and find the best places to visit.',
                'developer': 'Travel Apps Inc.',
                'category_name': 'Travel',
                'price': 0.00,
                'rating': 4.1,
                'download_count': 3500000,
            },
            {
                'title': 'Recipe Finder',
                'description': 'Find and save thousands of recipes, create shopping lists, and plan your meals.',
                'developer': 'Food & Drink Apps',
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
                'developer': 'Adventure Games Studio',
                'category_name': 'Adventure',
                'price': 0.00,
                'rating': 4.9,
                'download_count': 12000000,
            },
            {
                'title': 'Space Shooter',
                'description': 'Defend the galaxy from alien invaders in this action-packed space shooter.',
                'developer': 'Action Games Inc.',
                'category_name': 'Action',
                'price': 0.00,
                'rating': 4.6,
                'download_count': 8000000,
            },
            {
                'title': 'Puzzle Master',
                'description': 'Challenge your brain with hundreds of puzzles of increasing difficulty.',
                'developer': 'Puzzle Games Ltd.',
                'category_name': 'Puzzle',
                'price': 1.99,
                'rating': 4.8,
                'download_count': 5000000,
            },
            {
                'title': 'Racing Champions',
                'description': 'Race against opponents on tracks around the world with realistic physics and graphics.',
                'developer': 'Racing Games Studio',
                'category_name': 'Racing',
                'price': 4.99,
                'rating': 4.7,
                'download_count': 7000000,
            },
            {
                'title': 'Word Challenge',
                'description': 'Test your vocabulary and spelling skills with this addictive word game.',
                'developer': 'Word Games Co.',
                'category_name': 'Word',
                'price': 0.00,
                'rating': 4.5,
                'download_count': 3000000,
            },
            {
                'title': 'Strategy Empire',
                'description': 'Build your empire, train your army, and conquer your enemies in this strategic game.',
                'developer': 'Strategy Games Inc.',
                'category_name': 'Strategy',
                'price': 2.99,
                'rating': 4.6,
                'download_count': 4000000,
            },
            {
                'title': 'Sports League',
                'description': 'Compete in various sports with realistic gameplay and multiplayer modes.',
                'developer': 'Sports Games Studio',
                'category_name': 'Sports',
                'price': 3.99,
                'rating': 4.4,
                'download_count': 6000000,
            },
            {
                'title': 'Arcade Classic',
                'description': 'Enjoy classic arcade games with modern graphics and controls.',
                'developer': 'Arcade Games Ltd.',
                'category_name': 'Arcade',
                'price': 0.00,
                'rating': 4.3,
                'download_count': 2000000,
            },
            {
                'title': 'Simulation City',
                'description': 'Build and manage your own city with realistic simulation mechanics.',
                'developer': 'Simulation Games Co.',
                'category_name': 'Simulation',
                'price': 5.99,
                'rating': 4.8,
                'download_count': 9000000,
            },
            {
                'title': 'Role Playing Quest',
                'description': 'Create your character, level up, and embark on an epic quest in this RPG.',
                'developer': 'RPG Games Studio',
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
                'icon': f'icons/placeholder_{program_type}.png',  # Placeholder
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
                file=f'media/placeholder_screenshot_{i}.jpg'  # Placeholder
            )
        
        # Create banner
        Media.objects.create(
            program=program,
            media_type='banner',
            file='media/placeholder_banner.jpg'  # Placeholder
        )
        
        # Create video for some programs
        if random.choice([True, False]):
            Media.objects.create(
                program=program,
                media_type='video',
                file='media/placeholder_video.mp4'  # Placeholder
            )
    
    def create_reviews(self):
        self.stdout.write('Creating reviews...')
        
        # Ensure we have at least one user
        admin_user, created = User.objects.get_or_create(
            email='admin@example.com',
            defaults={
                'name': 'Admin User',
                'is_active': True,
                'is_staff': True,
                'is_superuser': True,
            }
        )
        
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write('  Created admin user: admin@example.com (password: admin123)')
        
        # Create regular users if needed
        users = list(User.objects.all())
        if len(users) < 5:
            for i in range(1, 6):
                user, created = User.objects.get_or_create(
                    email=f'user{i}@example.com',
                    defaults={
                        'name': f'User {i}',
                        'is_active': True,
                    }
                )
                
                if created:
                    user.set_password(f'user{i}pass')
                    user.save()
                    users.append(user)
                    self.stdout.write(f'  Created user: user{i}@example.com (password: user{i}pass)')
        
        # Add reviews to programs
        programs = Program.objects.all()
        
        for program in programs:
            # Add 3-10 reviews per program
            num_reviews = random.randint(3, 10)
            
            for _ in range(num_reviews):
                user = random.choice(users)
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
