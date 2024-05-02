import { WEBSITE_DESC } from '@/src/constant/setting';
import LoginPage from './page';

export const metadata = {
   title: 'Login',
   description: WEBSITE_DESC,
};

export default function LoginLayout({ children }) {
   return (
      <>
         <LoginPage>{children}</LoginPage>
      </>
   );
}
