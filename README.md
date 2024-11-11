# NYW NFT Marketplace

This is a NFT Marketplace powered by Generative AI for creating NFT assets using Stable Diffusion, DALL-E and Midjourney.

## Technologies Used

-Frontend

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/) 
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)

-Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [postgres](https://www.postgresql.org/)
- [subgraph](https://thegraph.com/)

-Smart Contract

- [solidity](https://docs.soliditylang.org/en/v0.8.27/)
- [hardhat](https://hardhat.org/)

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## Contribution

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.