import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  const sampleRatingsAndReviews = [
    {
      user: "661a3df9e78d5e8c4b9c1234",
      rating: 5,
      review:
        "This course was incredibly informative and well-structured. Highly recommend!",
      course: "661a3e10b2cd5a7c5fbc5678",
    },
    {
      user: "661a3df9e78d5e8c4b9c2345",
      rating: 4,
      review:
        "Great content and delivery, but could use more real-world examples.",
      course: "661a3e10b2cd5a7c5fbc5678",
    },
    {
      user: "661a3df9e78d5e8c4b9c3456",
      rating: 3,
      review:
        "It was okay—some parts were confusing and needed more explanation.",
      course: "661a3e22c8dd3e1f7abc6789",
    },
    {
      user: "661a3df9e78d5e8c4b9c4567",
      rating: 2,
      review:
        "Not what I expected. The instructor moved too fast and didn’t explain well.",
      course: "661a3e22c8dd3e1f7abc6789",
    },
    {
      user: "661a3df9e78d5e8c4b9c5678",
      rating: 5,
      review: "Fantastic course! Loved the examples and hands-on projects.",
      course: "661a3e44a9cd9c2d9abc7890",
    },
  ]

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.data.length !== 0) {
        console.log(data?.data)

        setReviews(data?.data)
        setReviews(sampleRatingsAndReviews)
      } else {
        setReviews(sampleRatingsAndReviews)
        setReviews(data?.data)
      }
    })()
  })

  // console.log(reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
