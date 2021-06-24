import Chart from "chart.js";
import $ from "jquery";
import getViewsData from "./../components/services/viewsServices";
import { toast } from "react-toastify";

function getMonthLength(month) {
	if (month === 2) return 28;
	else if ((month % 2 === 0 && month <= 7) || (month % 2 !== 0 && month >= 8))
		return 30;
	else return 31;
}

function getMonthDays(month) {
	let days = [];
	for (let i = 0; i < 31; i++) {
		if (month === 2 && i === 28) break;
		else if (
			((month % 2 === 0 && month < 7) ||
				(month % 2 !== 0 && month > 8)) &&
			i === 30
		) {
			break;
		}
		days.push(i + 1 + "");
	}
	return days;
}

const reorderWeekDays = (
	week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
) => {
	const day = new Date().getDay();
	const currentWeekDays = week.slice(0, day + 1);

	currentWeekDays.unshift(...week.slice(day + 1));

	return currentWeekDays;
};

const fillViewsData = (viewsData, length, noIndex = false) => {
	return Array(length)
		.fill(0, 0, length)
		.map((v, i) =>
			viewsData[i + (noIndex ? 1 : 0)]
				? viewsData[i + (noIndex ? 1 : 0)]
				: v
		);
};

export default async function renderChartJS() {
	let labels = {
		today: [
			"00",
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
		],
		week: reorderWeekDays(),
		year: [
			"Jan",
			"Fab",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
	};

	try {
		// get week views data
		let { data: viewsData } = await getViewsData("week");

		// fill empty days with zeros
		viewsData = fillViewsData(viewsData, 7);

		let ctx = document.getElementById("myChart").getContext("2d");
		let chart = new Chart(ctx, {
			// The type of chart we want to create
			type: "line",

			// The data for our dataset
			data: {
				labels: labels.week,
				datasets: [
					{
						label: "Views",
						backgroundColor: "rgba(217, 4, 41, 0.75)",
						pointBackgroundColor: "rgb(255, 255, 255)",
						pointBorderWidth: 2,
						pointRadius: 4,
						pointHoverBorderWidth: 2,
						borderColor: "rgb(217, 4, 41)",
						pointHoverBackgroundColor: "rgba(217, 4, 41, 0.75)",
						data: reorderWeekDays(viewsData),
					},
				],
			},

			// Configuration options go here
			options: {
				scales: {
					xAxes: [
						{
							ticks: {
								padding: 5,
								fontFamily: "'Nunito', serif",
								fontColor: "#2B2D42",
							},
							gridLines: {
								color: "#eee",
							},
						},
					],
					yAxes: [
						{
							ticks: {
								padding: 10,
								fontFamily: "'Nunito', serif",
								fontColor: "#2B2D42",
							},
							gridLines: {
								color: "#eee",
							},
						},
					],
				},
				legend: {
					display: false,
				},
				tooltips: {
					backgroundColor: "rgba(43, 45, 66, 0.9)",
					titleFontFamily: "'Nunito', serif",
					bodyFontFamily: "'Nunito', serif",
					cornerRadius: 3,
					xPadding: 8,
					yPadding: 8,
					titleMarginBottom: 8,
				},
			},
		});

		$("#diagram-control").on("change", async function () {
			let { data: viewsData } = await getViewsData(this.value);

			switch (this.value) {
				default:
				case "week":
					chart.data.labels = labels[this.value];
					chart.data.datasets[0].data = reorderWeekDays(
						fillViewsData(viewsData, 7)
					);
					break;

				case "month":
					const monthNo = new Date().getMonth() + 1;
					chart.data.labels = getMonthDays(monthNo);
					chart.data.datasets[0].data = fillViewsData(
						viewsData,
						getMonthLength(monthNo),
						true
					);
					break;

				case "year":
					chart.data.labels = labels[this.value];
					chart.data.datasets[0].data = fillViewsData(
						viewsData,
						12,
						true
					);
					break;

				case "today":
					chart.data.labels = labels[this.value];
					chart.data.datasets[0].data = fillViewsData(viewsData, 24);
					break;
			}

			// Update Chart with animation
			chart.update({
				duration: 400,
				easing: "linear",
			});
		});
	} catch (ex) {
		toast.error("Error in loading views data from the server");
	}
}
