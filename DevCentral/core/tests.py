from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Game, Review, Media
from .serializers import GameSerializer

User = get_user_model()

# Game model tests
class GameModelTest(TestCase):
    def setUp(self):
        self.game = Game.objects.create(
            title="Test Game",
            slug="test-game",
            description="A game for testing",
            developer="Dev",
            release_date="2025-01-01",
            price="9.99",
            category="action",
            file=SimpleUploadedFile("file.txt", b"content")
        )

    def test_str(self):
        self.assertEqual(str(self.game), "Test Game")

    def test_default_rating(self):
        self.assertEqual(self.game.rating, 0.0)

# Review model tests
class ReviewModelTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="user1", password="pass")
        self.user2 = User.objects.create_user(username="user2", password="pass")
        self.game = Game.objects.create(
            title="Test Game",
            slug="test-game",
            description="A game for testing",
            developer="Dev",
            release_date="2025-01-01",
            price="9.99",
            category="action",
            file=SimpleUploadedFile("file.txt", b"content")
        )

    def test_save_updates_rating(self):
        Review.objects.create(game=self.game, user=self.user1, score=5)
        self.game.refresh_from_db()
        self.assertEqual(self.game.rating, 5.0)
        Review.objects.create(game=self.game, user=self.user2, score=3)
        self.game.refresh_from_db()
        self.assertEqual(self.game.rating, 4.0)

    def test_delete_updates_rating(self):
        r1 = Review.objects.create(game=self.game, user=self.user1, score=4)
        r2 = Review.objects.create(game=self.game, user=self.user2, score=2)
        self.game.refresh_from_db()
        self.assertEqual(self.game.rating, 3.0)
        r1.delete()
        self.game.refresh_from_db()
        self.assertEqual(self.game.rating, 2.0)

# Media model tests
class MediaModelTest(TestCase):
    def setUp(self):
        self.game = Game.objects.create(
            title="Test Game",
            slug="test-game",
            description="A game for testing",
            developer="Dev",
            release_date="2025-01-01",
            price="9.99",
            category="action",
            file=SimpleUploadedFile("file.txt", b"content")
        )

    def test_str(self):
        media = Media.objects.create(game=self.game, media_type="screenshot", file=SimpleUploadedFile("img.png", b"pngdata"))
        self.assertEqual(str(media), "Test Game - screenshot")

# Serializer tests
class GameSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="u", password="p")
        self.game = Game.objects.create(
            title="Test Game",
            slug="test-game",
            description="A game for testing",
            developer="Dev",
            release_date="2025-01-01",
            price="9.99",
            category="action",
            file=SimpleUploadedFile("file.txt", b"content")
        )
        Review.objects.create(game=self.game, user=self.user, score=4)
        Media.objects.create(game=self.game, media_type="banner", file=SimpleUploadedFile("img.png", b"pngdata"))

    def test_serialization(self):
        serializer = GameSerializer(self.game)
        data = serializer.data
        self.assertIn("reviews", data)
        self.assertEqual(len(data["reviews"]), 1)
        self.assertIn("media", data)
        self.assertEqual(len(data["media"]), 1)

# API tests for Game, Review, and Media
class GameAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/games/"
        self.file = SimpleUploadedFile("file.txt", b"content")

    def test_list_empty(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_create_game(self):
        payload = {
            "title": "API Game",
            "slug": "api-game",
            "description": "desc",
            "developer": "Dev",
            "release_date": "2025-01-01",
            "price": "1.99",
            "category": "action",
            "file": self.file
        }
        response = self.client.post(self.url, payload, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Game.objects.count(), 1)

class ReviewAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="user", password="pass")
        self.game = Game.objects.create(
            title="API Game",
            slug="api-game",
            description="desc",
            developer="Dev",
            release_date="2025-01-01",
            price="1.99",
            category="action",
            file=SimpleUploadedFile("file.txt", b"content")
        )
        self.url = "/api/reviews/"

    def test_create_review(self):
        payload = {"game": self.game.id, "user": self.user.id, "score": 5}
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.game.refresh_from_db()
        self.assertEqual(self.game.rating, 5.0)

class MediaAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.game = Game.objects.create(
            title="API Game",
            slug="api-game",
            description="desc",
            developer="Dev",
            release_date="2025-01-01",
            price="1.99",
            category="action",
            file=SimpleUploadedFile("file.txt", b"content")
        )
        self.url = "/api/media/"
        self.file = SimpleUploadedFile("img.png", b"pngdata")

    def test_create_media(self):
        payload = {"game": self.game.id, "media_type": "trailer", "file": self.file}
        response = self.client.post(self.url, payload, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Media.objects.count(), 1)
