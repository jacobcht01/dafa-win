export default function TeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="te" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dark-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
