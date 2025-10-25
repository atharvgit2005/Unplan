Project Title- Unplan

Project Overview

Unplan is a web platform that connects solo travelers looking to join or organize group trips. Users can either post a trip (as hosts) or join existing ones based on preferences such as destination, travel dates, and budget.
The app includes AI-based trip recommendations, discussion forums active until trip completion, and social features like photo sharing and travel journaling.
The objective is to make solo travel more social, safe, and organized through community-driven interactions.

Key Features

User Authentication & Profiles – Secure sign-up/login, personalized profiles with travel interests.

Trip Management – Create, edit, or join trips with details like itinerary, cost, and participants.

AI Recommendations – Suggests trips and travel companions based on user behavior and preferences.

Trip Forums & Live Chat – Real-time group discussions available until the trip ends.

Social Sharing – Upload photos, like, and comment; maintain a travel journal.

Admin Tools – User and content moderation, platform analytics, and reporting.

User Roles
Role	Description
Traveler/User	Create profile, post/join trips, chat, share media.
Trip Host	Manage trip details, approve members, moderate trip forum.
Admin	Manage users, trips, and forums; oversee reports.
Guest (optional)	View public trips without posting or joining.
Pages / Screens

Auth: Login, Signup, Forgot Password

Home: Featured trips, AI suggestions, filters

Trip: Trip details, create/join pages

Forum: Group chat and posts per trip

Profile: View/edit profile, past and upcoming trips

Social Feed: Photo gallery, upload post

Admin Panel: User/trip management, analytics

Database Schema (Draft)

Users (user_id, name, email, password, bio, interests, profile_pic, role)
Trips (trip_id, host_id, destination, start_date, end_date, budget, description, max_participants, status)
TripParticipants (trip_id, user_id, joined_at, role)
Forums (forum_id, trip_id, created_at, is_active)
Messages (message_id, forum_id, user_id, message_text, timestamp)
Photos (photo_id, user_id, trip_id, photo_url, caption, uploaded_at)
AI_Recommendations (user_id, recommended_trip_ids, last_updated)

Tech Stack
Layer	Tools
Frontend	React.js 
Backend	Node.js with Express.js
ORM Prisma
Database	SQL / MongoDB 
Authentication	JWT + bcrypt
AI Integration	 OpenAI API
File Storage	 Firebase
Real-time Communication	Socket.io / Firebase
Workflow

User signs up and sets travel preferences.

System recommends trips or allows users to post their own.

Users join trips; trip-specific forums open for discussion.

Members coordinate plans, chat, and share updates/photos.

After the trip, the forum closes automatically; photos remain accessible.

AI improves future recommendations using user data.

Expected Outcomes

A functional prototype where travelers can create/join trips, communicate, and share experiences.

Integrated AI suggestions for personalized travel matches.

Secure authentication, user management, and responsive design.

Demonstration of a scalable full-stack system combining social networking and travel planning.
