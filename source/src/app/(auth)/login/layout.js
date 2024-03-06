import LoginPage from "./page";

export const metadata = {
   title: 'Login',
   description: 'Welcome to Next.js',
};

export default function LoginLayout({ children }) {
   return (
      <>
         <LoginPage>
            {children}
         </LoginPage>
      </>
   );

}
