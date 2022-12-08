import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts';

const EventGenre = ({ events }) => {

  const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
  const colors = ['#3e87fa', '#bfbf0d', '#157d2f', '#000396', '#ad0919'];

  const pieChartData = [];
  const genresAndCounts = {};
  genres.forEach((genre) => {
    genresAndCounts[genre] = 0;
  });

  events.forEach((event) => {
    genres.forEach((genre) => {
      if (event.summary.includes(genre)) {
        genresAndCounts[genre]++;
      }
    });
  });

  Object.keys(genresAndCounts).forEach((genre) => {
    pieChartData.push({ name: genre, value: genresAndCounts[genre] });
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent > 0) {
      return (
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}% ${genres[index]}`}
        </text>
      );
    }
  };

  return (
    <ResponsiveContainer height={300} >
      <PieChart width={400} height={400}>
        <Pie
          data={pieChartData}
          cx={"50%"}
          cy={"50%"}
          labelLine={false}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;