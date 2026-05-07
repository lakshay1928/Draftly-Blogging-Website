# Draftly - Blogging Platform

A modern, full-stack blogging application built with React and Node.js, featuring rich text editing, user authentication, and content management.

## 🚀 Features

### Core Features
- **Rich Text Editor**: Built with TipTap for creating and editing blog posts
- **User Authentication**: Secure login/registration with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **User Profiles**: Personal profiles with bio and profile pictures
- **Social Features**: Like and save blog posts
- **Categories & Tags**: Organize content with categories and tags
- **Read Time Estimation**: Automatic calculation of reading time
- **Image Upload**: Cloudinary integration for featured images

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **RESTful API**: Clean API endpoints for all operations
- **Database Integration**: MongoDB with Mongoose ODM
- **File Upload**: Multer with Cloudinary storage
- **Password Security**: Bcrypt for password hashing
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks
- **Vite 7.0.4** - Fast development server and build tool
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Router 7.7.0** - Client-side routing
- **TipTap 3.0.7** - Rich text editor
- **React Hook Form 7.60.0** - Form management
- **Zod 4.0.5** - Schema validation
- **Axios 1.10.0** - HTTP client
- **Lucide React 0.525.0** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.4** - MongoDB object modeling
- **JWT 9.0.2** - Authentication tokens
- **Bcryptjs 3.0.2** - Password hashing
- **Cloudinary 2.7.0** - Image storage
- **Multer 2.0.2** - File upload handling
- **CORS 2.8.5** - Cross-origin resource sharing

## 📁 Project Structure

```
draftly/
├── draftly-backend/          # Node.js API server
│   ├── controllers/          # Route controllers
│   ├── db/                  # Database connection
│   ├── middlewares/         # Custom middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── app.js              # Main application file
├── draftly-frontend/         # React application
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       └── App.jsx         # Main application component
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd draftly
   ```

2. **Backend Setup**
   ```bash
   cd draftly-backend
   npm install
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

3. **Frontend Setup**
   ```bash
   cd ../draftly-frontend
   npm install
   ```

4. **Environment Variables**
   
   Copy the example file and add your credentials:
   ```bash
   cd draftly-backend
   cp .env.example .env
   ```
   
   Edit the `.env` file with your actual credentials:
   ```env
   MONGODB_URL=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_key_here
   CLOUD_NAME=your_cloudinary_cloud_name_here
   CLOUDINARY_API_KEY=your_cloudinary_api_key_here
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd draftly-backend
   npm run dev
   ```
   The server will run on `http://localhost:8080`

2. **Start the Frontend**
   ```bash
   cd draftly-frontend
   npm run dev
   ```
   The application will run on `http://localhost:5173`

## 📖 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### Blogs
- `GET /api/v1/blogs` - Get all blogs
- `GET /api/v1/blogs/:id` - Get single blog
- `POST /api/v1/blogs` - Create new blog
- `PATCH /api/v1/blogs/:id` - Update blog
- `DELETE /api/v1/blogs/:id` - Delete blog
- `PATCH /api/v1/blogs/:id/like` - Like/unlike blog
- `PATCH /api/v1/blogs/:id/save` - Save/unsave blog

## 🎨 UI Components

### Pages
- **Home Page** - Landing page with featured blogs
- **Blogs Page** - List of all blog posts
- **Single Blog Page** - Individual blog view
- **Create Blog** - Blog creation form with rich editor
- **Profile Page** - User profile and saved blogs
- **Login/Register** - Authentication pages

### Components
- **Navbar** - Navigation with user menu
- **Blog Card** - Blog post preview component
- **Rich Text Editor** - TipTap-based editor
- **Like Button** - Interactive like functionality
- **Save Button** - Bookmark functionality

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Secure file uploads

## 🌟 Key Features Explained

### Rich Text Editing
The application uses TipTap, a modern rich text editor built on ProseMirror, providing:
- Formatting options (bold, italic, underline, etc.)
- Headings and lists
- Links and mentions
- Clean, semantic HTML output

### User Management
- Secure registration and login
- Profile customization
- Blog ownership tracking
- Social interactions (likes, saves)

### Content Organization
- Categories: Technology, Lifestyle, Travel, Food, Education, Other
- Tagging system for better content discovery
- Automatic read time calculation
- Featured image support

## 📝 Development Notes

- The backend follows RESTful API principles
- Frontend uses modern React patterns with hooks
- State management is handled with React's built-in state
- Styling is done with Tailwind CSS utility classes
- The application is fully responsive and mobile-friendly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
