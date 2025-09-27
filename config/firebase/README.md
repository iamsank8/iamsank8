# Firebase Service Account Configuration

## Setup Instructions

1. **Download Service Account Key**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download the JSON file

2. **Place the Service Account Key**
   - Rename the downloaded file to `service-account-key.json`
   - Place it in this directory: `config/firebase/service-account-key.json`

3. **Set Environment Variables**
   - Copy `.env.example` to `.env` in the project root
   - Update the environment variables as needed

## Security Notes

- The service account key file is automatically ignored by Git
- Never commit service account keys to version control
- Use environment variables for different environments (dev/staging/prod)
- Rotate service account keys regularly for security

## File Structure
```
config/
└── firebase/
    ├── README.md (this file)
    └── service-account-key.json (place your key here)
```

## Environment Variables

The following environment variables should be set in your `.env` file:

```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./config/firebase/service-account-key.json

# Environment
NODE_ENV=development