import AppLayout from './app';

export const metadata = {
   title: 'NextJS',
   description: 'Welcome to Next.js',
};

export default function RootLayout({ children }) {

   return (
      <>
         <AppLayout>{children}</AppLayout>
      </>
   );
}
