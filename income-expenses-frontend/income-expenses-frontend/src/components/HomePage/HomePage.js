import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      <header className="bg-green-500 text-white text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Manage Your Finances Effectively
        </h1>
        <p className="text-lg md:text-xl">
          Take control of your income and expenses with our user-friendly
          software.
        </p>
      </header>

      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Simplify Your Financial Tracking
              </h2>
              <p className="text-gray-600">
                Say goodbye to manual expense logging. Our software makes it
                easy to manage everything in one place.
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <img
              className="w-full rounded-lg shadow-md hover:shadow-xl transition duration-300"
              src="https://source.unsplash.com/900x600/?finance"
              alt="Financial Management"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-0 bg-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center md:justify-between">
          <div className="md:w-1/2">
            <img
              className="w-full rounded-lg shadow-md hover:shadow-xl transition duration-300"
              src="https://source.unsplash.com/900x600/?money"
              alt="Money Management"
            />
          </div>

          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Visualize Your Finances
              </h2>
              <p className="text-gray-600">
                Track your income and expenses over time. Get insights into your
                spending patterns effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Take Control of Your Budget
              </h2>
              <p className="text-gray-600">
                Stay on top of your spending with our easy-to-use budgeting
                tool. Start for free today.
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <img
              className="w-full rounded-lg shadow-md hover:shadow-xl transition duration-300"
              src="https://source.unsplash.com/900x600/?budget"
              alt="Budgeting"
            />
          </div>
        </div>
      </section>

      <section className="bg-green-500 text-white py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Start Your Financial Journey Today
        </h2>
        <p className="text-lg md:text-xl">
          Join thousands of users who have transformed their financial lives
          with our Income and Expenses Tracker.
        </p>
        <button className="bg-white text-green-500 px-8 py-3 mt-8 rounded-full hover:bg-green-100 transition duration-300">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default HomePage;
