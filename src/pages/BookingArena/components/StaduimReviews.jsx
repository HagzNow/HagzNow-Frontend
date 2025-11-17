import { Star, Quote, Calendar, User } from 'lucide-react';
import Image1 from '../../../assets/images/user1.jpeg';
import Image2 from '../../../assets/images/user2.jpeg';
import Image3 from '../../../assets/images/user3.jpeg';

export default function StaduimReviews() {
  const reviews = [
    {
      img: Image3,
      name: 'أحمد إبراهيم',
      text: 'تجربة رائعة! الملعب نظيف والتنظيم ممتاز. الخدمة كانت سريعة والموظفين متعاونين جداً. سأعود مرة أخرى بالتأكيد.',
      date: '2024/10/20',
      rating: 5,
    },
    {
      img: Image1,
      name: 'سارة محمود',
      text: 'خدمة سريعة وسهلة. أنصح الجميع بالحجز من هنا! الإضاءة ممتازة والملعب مجهز بأفضل المعدات.',
      date: '2024/10/18',
      rating: 4.5,
    },
    {
      img: Image2,
      name: 'محمد خالد',
      text: 'الملعب ممتاز والإضاءة رائعة، أنصح بالتجربة. الأسعار مناسبة والموقع سهل الوصول إليه.',
      date: '2024/10/15',
      rating: 4.8,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border border-gray-100 overflow-hidden group">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-500">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">تقييمات المستخدمين</h2>
            <p className="text-gray-600 text-sm mt-1">آراء العملاء حول تجربتهم</p>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-200 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-emerald-50/50 transition-all duration-500 ease-in-out group/card"
            >
              {/* Quote Icon */}
              <div className="flex justify-end mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover/card:bg-green-200 transition-colors duration-300">
                  <Quote className="w-5 h-5 text-green-600" />
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-6 text-right line-clamp-3 group-hover/card:text-gray-800 transition-colors duration-300">
                "{review.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm group-hover/card:border-green-200 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center border-2 border-white">
                    <User className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-semibold text-gray-900 group-hover/card:text-green-700 transition-colors duration-300">
                    {review.name}
                  </h3>
                  <div className="flex items-center gap-2 justify-end mt-1">
                    <div className="flex items-center gap-0.5">{renderStars(review.rating)}</div>
                    <span className="text-sm font-medium text-gray-700">{review.rating}</span>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 justify-end pt-4 border-t border-gray-100 group-hover/card:border-green-100 transition-colors duration-300">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        {/* <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out font-semibold">
            <Star className="w-4 h-4" />
            عرض جميع التقييمات
            <span className="bg-white/20 px-2 py-1 rounded-lg text-xs">{reviews.length}+</span>
          </button>
        </div> */}

        {/* No Reviews State (commented out for reference) */}
        {/* 
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-600 text-lg font-medium mb-2">لا توجد تقييمات بعد</h3>
          <p className="text-gray-500 text-sm">كن أول من يقيم هذا الملعب</p>
        </div>
        */}
      </div>
    </div>
  );
}
