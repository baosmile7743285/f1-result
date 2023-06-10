import { Bar, BarConfig } from "@ant-design/plots";
import React from "react";
import { ITeam } from "../../types";

type IProps = {
  teamsInfor: ITeam[];
};

const LineChart: React.FC<IProps> = ({ teamsInfor }) => {
  const config: BarConfig = {
    data: teamsInfor.map((team) => {
      return {
        name: team.name,
        value: team.points,
      };
    }),
    xField: "value",
    yField: "name",
    seriesField: "name",
    legend: {
      position: "top-left",
    },
  };
  return <Bar {...config} />;
};
export default LineChart;
