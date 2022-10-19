import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const colors = ['#3e87fa', '#bfbf0d', '#157d2f', '#000396', '#ad0919'];

  useEffect(() => {
    const getData = () => {
      
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
      const data = genres.map((genre) => {
        const value = events.filter((event) =>
          event.summary.split(' ').includes(genre)).length;
        return { name: genre, value };
      });
      return data;
    };
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart margin={ { top: 5, right: 5, bottom: 5, left: 5 } }>
        <Pie
          data={data}
          cy={200}
          labelLine={false}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;