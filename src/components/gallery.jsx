// import Image from 'next/image';
// import React from 'react';

// const GalleryPage = ({ images }) => {
//   return (
//     <section className="py-20 bg-[#F8FAFC] dark:bg-[#0B132B] transition-colors duration-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-[#172B3A] dark:text-[#F1F5F9]">
//             Moments That Inspire Change
//           </h2>
//           <p className="mt-3 text-base sm:text-lg text-[#64748B] dark:text-[#CBD5E1]">
//             Every small act of kindness creates a story worth sharing.
//           </p>
//         </div>

//         {/* Grid Gallery */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {images.map((item) => (
//             <div
//               key={item.id}
//               className="relative group h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer"
//             >
//               <Image
//                 src={item.url}
//                 alt={item.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//                 <h3 className="text-white font-bold text-lg">{item.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default GalleryPage;