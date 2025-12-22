# Notiq 💚

An elegant web-based note-taking app designed to help you capture and organize your thoughts and ideas.

## Features

- **Markdown Support** - Write notes with full markdown formatting
- **Auto-save** - Never lose your work with automatic saving
- **Tags & Organization** - Categorize notes with custom tags
- **Search** - Quickly find notes by title or content
- **Secure** - End-to-end encrypted password storage
- **Clean Interface** - Distraction-free design focused on your thoughts

## Tech Stack

- **Next.js** - React framework with TypeScript
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Accessible component library
- **Supabase** - PostgreSQL database & authentication
- **Vercel** - Deployment platform

## Getting Started

```bash
# Install dependencies
yarn install

# Set up environment variables
touch .env.local
# Add your Supabase credentials

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
notiq/
├── app/              # Next.js app router
├── components/       # React components
├── lib/              # Utilities & helpers
└── public/           # Static assets
```

## Roadmap

- [ ] User authentication
- [ ] Create, edit, delete notes
- [ ] Markdown editor
- [ ] Tags system
- [ ] Search functionality
- [ ] Favorites
- [ ] Trash & archive
- [ ] Export notes
- [ ] Sharing

## Contributing

This is a learning project. Feel free to fork and experiment!

## License

MIT

---

Built with 💚 by Sudo-114
