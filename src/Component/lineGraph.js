import {Line} from 'react-chartjs-2';

const LineGraph = (props) => {
    return (
            <Line data ={{
                labels: props.chartData.label,
                datasets: [
                    {
                        label:props.chartData.label,
                        data: props.chartData.data,
                        backgroundColor: props.chartData.backColor,
                        borderColor: props.chartData.color,
                        borderWidth: 1
                    },
                ],
            }}/>
    );
}

export default LineGraph;