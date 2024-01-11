import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function ExerciseChart({data}, exerciseName) {
  useEffect(() => {

    const exerciseData = data
  
    const ctx = document.getElementById('exerciseData').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: exerciseData.map((row) => row.completed_at.slice(5, 10) + '-' + row.completed_at.slice(2, 4)),
        datasets: [
          {
            label: 'Weight',
            data: exerciseData.map((row) => row.weight),
            yAxisID: 'y',
          },
          {
            label: 'Reps',
            data: exerciseData.map((row) => row.reps),
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: false,
            text: 'Chart.js Line Chart - Multi Axis',
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]); // Empty dependency array to run the effect only once

  return (
    <div className='relative h-[50vh] w-full'>
      <h2>{exerciseName.exerciseName}</h2>
      <canvas id="exerciseData" height="100%"></canvas>
    </div>
  );
}
