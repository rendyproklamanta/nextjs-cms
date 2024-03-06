import PmbForm from "@/src/components/form/PmbForm";

export const metadata = {
   title: 'Edit PMB',
   description: 'Welcome to Next.js',
};

const ManagePmbPage = ({ params }) => {
   return (
      <PmbForm params={params} />
   );
};

export default ManagePmbPage;
