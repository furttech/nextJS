import { inter } from '../_components/fonts';
import { Metadata } from "next";
import '@/app/(public_zone)/global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Blog',
    default: 'Full Stack Blog w/ Next-Auth'
  },
  description: 'This app explores the use of Zod validation on prisma(postgres) schemas. The main project utilizes Next-js AppRouter backend with typescript, react and next-auth authenticated routes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}