# Beagle Bliss

A delightful web hub for Beagle enthusiasts, offering a photo gallery, curated shop, grooming services, and specialized AI vet advice.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/jwillo/beagle-bliss)

Beagle Bliss is a whimsical, all-in-one web application dedicated to Beagle lovers. It combines a community photo gallery, a curated e-commerce store for Beagle-specific products, a service booking system for grooming, and an AI-powered veterinarian assistant for specialized advice. The platform is designed with a playful, illustrative aesthetic, featuring custom graphics, a warm color palette, and delightful micro-interactions to create an engaging and human-centered experience.

## ✨ Key Features

-   **Community Photo Gallery**: A beautiful, masonry-grid photo gallery for users to upload and share their favorite Beagle pictures, with support for individual and bulk uploads.
-   **Curated E-commerce Shop**: A dedicated store featuring high-quality food, toys, and grooming supplies specifically selected for Beagles.
-   **Grooming Services**: An easy-to-use booking system for scheduling Beagle grooming appointments, complete with service details and an interactive calendar.
-   **AI Veterinarian Assistant**: An intelligent chat interface where users can get instant, specialized advice on Beagle health, behavior, and care from a trained AI.
-   **Whimsical Design**: A playful and warm user interface with custom illustrations and a unique, hand-drawn feel.
-   **Fully Responsive**: A seamless experience across all devices, from mobile phones to desktops.

## 🛠️ Technology Stack

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS
-   **UI Components**: shadcn/ui, Framer Motion for animations, Lucide React for icons
-   **State Management**: Zustand
-   **Forms**: React Hook Form with Zod for validation
-   **Routing**: React Router
-   **Backend**: Cloudflare Workers, Hono
-   **Stateful Backend**: Cloudflare Agents (built on Durable Objects)
-   **AI Integration**: Cloudflare AI Gateway, OpenAI SDK

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later)
-   [Bun](https://bun.sh/) package manager
-   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/beagle-bliss.git
    cd beagle-bliss
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.dev.vars` file in the root of the project for local development. You will need to populate it with your Cloudflare and other API credentials.

    ```ini
    # .dev.vars

    # Cloudflare AI Gateway URL
    # Found in your Cloudflare Dashboard -> AI -> AI Gateway
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"

    # Cloudflare API Key for the AI Gateway
    # Create a token with "AI Gateway: Read" permissions
    CF_AI_API_KEY="YOUR_CLOUDFLARE_API_KEY"

    # (Optional) SerpAPI Key for web search tool
    # Get one from https://serpapi.com/
    SERPAPI_KEY="YOUR_SERPAPI_KEY"
    ```

### Running the Development Server

To start the local development server, which includes the Vite frontend and the Cloudflare Worker, run:

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

## 📦 Deployment

This project is designed for seamless deployment to Cloudflare's global network.

1.  **Login to Wrangler:**
    If you haven't already, authenticate the Wrangler CLI with your Cloudflare account:
    ```bash
    bunx wrangler login
    ```

2.  **Configure Secrets:**
    Before deploying, you need to add your secret keys to your Cloudflare Worker environment.

    ```bash
    bunx wrangler secret put CF_AI_API_KEY
    bunx wrangler secret put CF_AI_BASE_URL
    bunx wrangler secret put SERPAPI_KEY
    ```
    You will be prompted to enter the value for each secret.

3.  **Deploy the application:**
    Run the deploy script to build the application and deploy it to Cloudflare.
    ```bash
    bun deploy
    ```

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/jwillo/beagle-bliss)

## 📂 Project Structure

-   `src/`: Contains all the frontend code, including React components, pages, hooks, and utility functions.
-   `worker/`: Contains the backend Cloudflare Worker code, including the Hono router, Durable Object classes (`ChatAgent`, `AppController`), and AI integration logic.
-   `wrangler.jsonc`: Configuration file for the Cloudflare Worker, including bindings and build settings.
-   `public/`: Static assets that are served directly.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, feature requests, or improvements.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.