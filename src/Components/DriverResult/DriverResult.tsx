import {
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IDrvierFilter, IDrvierInfor, ITeam } from "../../types";
import { format } from "../../utils/format_date";
import {
  driverInfor,
  driverInfor2022,
  teamInfor2022,
  teamInfor2023,
} from "../../utils/temp_data";
import "./styles.css";
import LineChart from "../LineChart/LineChart";

const DriverResult: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<IDrvierInfor[]>();
  const [filterProps, setFilterProps] = useState<IDrvierFilter>({
    year: "2023",
  });
  const [teamsInfor, setTeamInfor] = useState<ITeam[]>([]);
  const [racesInfor, setraceInfor] = useState<IDrvierInfor[]>([]);

  useEffect(() => {
    switch (filterProps?.year) {
      case "2023":
        setraceInfor(driverInfor);
        setTeamInfor(teamInfor2023);
        break;
      case "2022":
        setraceInfor(driverInfor2022);
        setTeamInfor(teamInfor2022);
        break;

      default:
        setraceInfor(driverInfor);
        break;
    }
    filterDriverResult();
  }, [searchText, filterProps]);

  const filterDriverResult = () => {
    let filterdData = racesInfor.filter((item, index) => {
      const textFilter = searchText
        ? item.grandPrix.toLowerCase().includes(searchText?.toLowerCase()) ||
          item.car.toLowerCase().includes(searchText?.toLowerCase()) ||
          item.winner.toLowerCase().includes(searchText?.toLowerCase()) ||
          item.laps.toString().includes(searchText?.toLowerCase()) ||
          item.time.includes(searchText?.toLowerCase()) ||
          moment(item.date).format(format.date).includes(searchText)
        : true;

      const dateFilter = filterProps?.date
        ? moment(filterProps?.date)
            .format(format.date)
            .includes(moment(item.date).format(format.date))
        : true;

      const carFilter = filterProps?.car
        ? item.car.toLowerCase().includes(filterProps?.car?.toLowerCase())
        : true;

      return textFilter && dateFilter && carFilter;
    });

    setData(filterdData);
  };

  const columns: ColumnsType<IDrvierInfor> = [
    {
      title: "GRAND PRIX",
      dataIndex: "grandPrix",
      key: "grandPrix",
      render: (value) => <Typography.Text strong>{value}</Typography.Text>,
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (value, record, index) => moment(value).format("DD MMM YYYY"),
    },
    {
      title: "WINNER",
      dataIndex: "winner",
      key: "winner",
      render: (value) => <Typography.Text strong>{value}</Typography.Text>,
    },
    {
      title: "CAR",
      dataIndex: "car",
      key: "car",
      render: (value) => <Typography.Text strong>{value}</Typography.Text>,
    },
    {
      title: "LAPS",
      dataIndex: "laps",
      key: "laps",
      render: (value) => <Typography.Text strong>{value}</Typography.Text>,
      sorter: (a, b) => a.laps - b.laps,
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      render: (value) => <Typography.Text strong>{value}</Typography.Text>,
    },
  ];

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    const value = dateString ? moment(dateString, "DD/MM/YYYY") : undefined;
    setFilterProps({
      ...filterProps,
      date: value,
    });
  };
  const handleChange = (value: string, prop: string) => {
    console.log(`selected ${value}`);
    setFilterProps({
      ...filterProps,
      [prop]: value,
    });
  };

  return (
    <Row>
      <div className="shadow-md shadow-gray-200 w-full p-5 rounded-lg mb-10">
        <Divider orientation="left">
          <h4 className="font-sans font-bold uppercase">RACE Result Filter</h4>
        </Divider>
        <Row className="mb-5">
          <Select
            defaultValue="2023"
            style={{ width: 120 }}
            onChange={(value) => handleChange(value, "year")}
            options={[{ value: "2023" }, { value: "2022" }]}
          />
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <Input.Search
              allowClear
              placeholder="Grand Prix, Winner, Car, Laps, Date, Time"
              onSearch={onSearch}
              style={{ width: 300 }}
            />
          </Col>
          <Col>
            <DatePicker onChange={onChange} format={format.date} allowClear />
          </Col>
          <Col>
            <Select
              allowClear
              style={{ width: 280 }}
              placeholder="Car..."
              onChange={(value) => handleChange(value, "car")}
              options={teamInfor2022.map((item, index) => {
                return {
                  key: index,
                  value: item.name,
                };
              })}
            />
          </Col>
        </Row>
      </div>
      <div className="shadow-md shadow-gray-200 w-full p-5 rounded-lg mb-10">
        <Divider orientation="left">
          <h1 className="font-sans font-bold uppercase">2023 RACE RESULTS</h1>
        </Divider>
        <Table
          rowKey="id"
          className="result-table"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <div className="shadow-md shadow-gray-200 w-full p-5 rounded-lg mb-10">
        <Divider orientation="left">
          <h1 className="font-sans font-bold uppercase">TEAMS POINTS</h1>
        </Divider>
        <LineChart teamsInfor={teamsInfor}></LineChart>
      </div>
    </Row>
  );
};

export default DriverResult;
