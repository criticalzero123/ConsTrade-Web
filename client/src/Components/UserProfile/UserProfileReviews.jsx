import React from "react";

import { Rating, Card } from "flowbite-react/lib/cjs/components";

const UserProfileReviews = ({ user }) => {
  return (
    <div>
      <>
        <Rating>
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star filled={false} />

          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            4.95 out of 5 (10 ratings)
          </p>
          <p className="text-sm font-medium text-gray-500 ml-10 hover:underline hover:text-blue-500 hover:cursor-pointer">
            View All
          </p>
        </Rating>
        <div className="mt-5">
          <Rating.Advanced percentFilled={70}>5 star</Rating.Advanced>
          <br />
          <Rating.Advanced percentFilled={17}>4 star</Rating.Advanced>
          <br />
          <Rating.Advanced percentFilled={8}>3 star</Rating.Advanced>
          <br />
          <Rating.Advanced percentFilled={4}>2 star</Rating.Advanced>
          <br />
          <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
        </div>
      </>

      <br />
      <div className="lg:w-3/4">
        <Card>
          <div className="flex">
            <img
              className="mb-3 mr-6 h-24 w-24 rounded-full shadow-xl"
              src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
              alt={user.name}
            />
            <div>
              <div className="flex place-items-center mb-3 ">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  John Doe{" "}
                </h5>
                <span className="ml-3 mt-2">
                  <Rating>
                    <Rating.Star /> 3
                  </Rating>
                </span>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfileReviews;
