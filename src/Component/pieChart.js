import {Pie} from 'react-chartjs-2';


const PieChart = (props) => {
    return (
            <Pie data={{ 
                labels: props.chartData.label,
                datasets: [
                {
                    label: '',
                    data: props.chartData.data,
                    backgroundColor: props.chartData.backColor,
                    borderColor: props.chartData.color,
                    borderWidth: 1
                },
                
            ],
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }}/>
    );
}

export default PieChart;