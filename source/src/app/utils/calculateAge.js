export const calculateAge = (dob) => {
   dob = new Date(dob);
   const today = new Date();

   let age = today.getFullYear() - dob.getFullYear();

   // Check if the birthday has already occurred this year
   if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
      return age;
   }

};