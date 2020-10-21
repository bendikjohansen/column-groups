import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataItem,
  DataObjectType,
  fetchData,
  selectDataList,
} from "../app/redux/dataSlice";

interface TableType {
  key: string;
  headers: string[];
  data: DataItem[][];
}

type ViewType = TableType[];

const groupByThree = (list: DataObjectType[]): ViewType => {
  const data = list.filter(({ machines }) => machines.length);

  const view: ViewType = [];

  for (let i = 0; i < data.length; i += 3) {
    const part = data.splice(i, 3);
    const max = Math.max(...part.map((datum) => datum.machines.length));

    const headers = part.map((datum) => datum.city);
    const rows = [];
    for (let j = 0; j < max; j++) {
      const row = part.reduce(
        (result, datum): DataItem[] => result.concat(datum.machines[j]),
        [] as DataItem[]
      );
      rows.push(row.filter(item => item));
    }
    view.push({
      headers,
      key: headers.join(','),
      data: rows
    })
  }

  return view;
};

const useFetchData = (): ViewType => {
  const data = useSelector(selectDataList);
  const viewData = useMemo(() => groupByThree(data), [data]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length) {
      return;
    }

    dispatch(fetchData());
  });

  return viewData;
};

export default useFetchData;
