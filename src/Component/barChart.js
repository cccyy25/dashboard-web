import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
    return (
           <Bar
                data={{
                    labels: props.chartData.label,
                    datasets: [
                        {
                            labels: props.chartData.label,
                            data: props.chartData.data,
                            backgroundColor: props.chartData.backColor,
                            borderColor:  props.chartData.color,
                            borderWidth: 1
                        },
                    ],
                }}
            />
    );
}

export default BarChart;