import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import CardExpense from "../Card/CardExpense";
const List = () => {
  useEffect(() => {
    const options = {
      series: [
        {
          name: "Income",
          color: "#31C48D",
          data: ["1420", "1620", "1820", "1420", "1650", "2120"],
        },
        {
          name: "Expense",
          data: ["788", "810", "866", "788", "1100", "1200"],
          color: "#F05252",
        }
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 400,
        toolbar: {
          show: false,
        }
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        formatter: function (value) {
          return "$" + value;
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
          formatter: function (value) {
            return "$" + value;
          },
        },
        categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20,
        },
      },
      fill: {
        opacity: 1,
      }
    };

    if (document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("bar-chart"), options);
      chart.render();
    }
  }, []);
  return (
    // <div className="flex min-h-screen items-center justify-center bg-[#e5e7eb]">
    <div
      aria-label="card"
      className="h-full w-full rounded-[10px] border border-slate-300 bg-white p-4"
    >
      <div aria-label="header" className="flex items-center space-x-2">
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/color/32/expensive-2--v1.png"
          alt="expensive-2--v1"
        />
        <div className="flex-1 space-y-0.5">
          <p className="text-gray-900 text-base font-medium leading-tight tracking-tight">
            Trò chuyện
          </p>
        </div>
        <a
          href="/"
          className="mr-[45px] inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4b5563] text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M17 7l-10 10"></path>
            <path d="M8 7l9 0l0 9"></path>
          </svg>
        </a>
      </div>
      <div className="flex">
        <div class="dark:bg-gray-800 w-full max-w-sm rounded-lg bg-white p-4 shadow md:p-6">
          <div class="border-gray-200 dark:border-gray-700 flex justify-between border-b pb-3">
            <dl>
              <dt class="text-gray-500 dark:text-gray-400 pb-1 text-base font-normal">
                Tổng kinh phí
              </dt>
              <dd class="text-gray-900 text-3xl font-bold leading-none dark:text-white">
                2.000.000đ
              </dd>
            </dl>
            <div>
              <span class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg
                  class="me-1.5 h-2.5 w-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13V1m0 0L1 5m4-4 4 4"
                  />
                </svg>
                Đã chi 23.5%
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 py-3">
            <dl>
              <dt class="text-gray-500 dark:text-gray-400 pb-1 text-base font-normal">
                Còn dư
              </dt>
              <dd class="text-xl font-bold leading-none text-green-500 dark:text-green-400">
                1.000.000đ
              </dd>
            </dl>
            <dl>
              <dt class="text-gray-500 dark:text-gray-400 pb-1 text-base font-normal">
                Đã chi
              </dt>
              <dd class="text-xl font-bold leading-none text-red-600 dark:text-red-500">
                -1.000.000đ
              </dd>
            </dl>
          </div>

          <div id="bar-chart"></div>
          <div class="border-gray-200 dark:border-gray-700 grid grid-cols-1 items-center justify-between border-t">
            <div class="flex items-center justify-between pt-5">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="lastDaysdropdown"
                data-dropdown-placement="bottom"
                class="text-gray-500 dark:text-gray-400 hover:text-gray-900 inline-flex items-center text-center text-sm font-medium dark:hover:text-white"
                type="button"
              >
                Last 6 months
                <svg
                  class="m-2.5 ms-1.5 w-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="lastDaysdropdown"
                class="divide-gray-100 dark:bg-gray-700 z-10 hidden w-44 divide-y rounded-lg bg-white shadow"
              >
                <ul
                  class="text-gray-700 dark:text-gray-200 py-2 text-sm"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      class="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                    >
                      Yesterday
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                    >
                      Today
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                    >
                      Last 7 days
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                    >
                      Last 30 days
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                    >
                      Last 90 days
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                    >
                      Last 6 months
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                    >
                      Last year
                    </a>
                  </li>
                </ul>
              </div>
              <a
                href="#"
                class="hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold uppercase text-blue-600 hover:text-blue-700 dark:hover:text-blue-500"
              >
                Revenue Report
                <svg
                  class="ms-1.5 h-2.5 w-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-label="content"
          className=" mt-3 mr-[-10px] grid max-h-56 gap-2.5 overflow-y-auto custom-scroll"
        >
          <CardExpense
            title={"Mỳ Quảng bà Liên"}
            units={"đồng"}
            consumption={"7h00 18/7/2024"}
            icon={
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/fluency/28/map-pin.png"
                alt="map-pin"
              />
            }
          />
          <CardExpense
            title={"Mỳ Quảng bà Liên"}
            units={"đồng"}
            consumption={"7h00 18/7/2024"}
            icon={
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/fluency/28/map-pin.png"
                alt="map-pin"
              />
            }
          />

        </div>

      </div></div>
    // </div>
  );
};

export default List;
