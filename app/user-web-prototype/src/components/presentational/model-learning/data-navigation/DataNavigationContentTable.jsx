import * as React from 'react';
import {useEffect, useState} from 'react';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Checkbox, Paper, Switch} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {StyledTable, StyledTableCell, StyledTableHeaderCell} from "../StyledTableComponents";

const AVERAGE_SPEED = "평균속도";

const SWITCH_LABEL = {inputProps: {'aria-label': 'Switch'}};
const CHECKBOX_LABEL = {inputProps: {'aria-label': 'CheckBox'}};

export default function DataNavigationContentTable(props) {
  const {setAnyTargetVariableChecked} = props;

  const [data, setData] = useState([]);

  useEffect(() => {
      const setUseAndTargetVariableData = props.data.map((it, idx) => {
        if (it.variable_name === AVERAGE_SPEED) {
          setAnyTargetVariableChecked(true);

          return {
            ...it,
            id: idx + 1,
            use: true,
            target_variable: true
          }
        }

        return {
          ...it,
          id: idx +1,
          use: true,
          target_variable: false
        }
      });

      setData(setUseAndTargetVariableData);
    }, [props.data] // 변경될때마다 호출됨
  );

  function handleChangeSwitch(row, idx) {
    return () => {
      let copyOfData = JSON.parse(JSON.stringify(data));
      const use = data[idx].use;

      copyOfData[idx] = {
        ...row,
        use: !use,
        target_variable: false
      }

      setData(copyOfData);
      handleNextButton(copyOfData);
    };
  }

  function handleChangeCheckbox(row, idx) {
    return () => {
      let copyOfData = JSON.parse(JSON.stringify(data));
      const targetVariable = data[idx].target_variable;

      copyOfData[idx] = {
        ...row,
        target_variable: !targetVariable,
      }

      setData(copyOfData);
      handleNextButton(copyOfData);
    };
  }

  function handleNextButton(copyOfData) {
    if (anyTargetVariableChecked(copyOfData)) {
      setAnyTargetVariableChecked(true);
    } else {
      setAnyTargetVariableChecked(false);
    }
  }

  function anyTargetVariableChecked(copyOfData) {
    return copyOfData.map(it => it.target_variable)
      .includes(true)
  }

  return (
    <TableContainer component={Paper} sx={{
      height: '400px'
    }}>
      <StyledTable aria-label="data table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell align="left">아이디</StyledTableHeaderCell>
            <StyledTableHeaderCell align="left">변수명</StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">변수유형</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">최솟값</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">최대값</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">결측값</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">평균</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">표준편차</StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">사용</StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">목표변수</StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.variable_name}
            >
              <StyledTableCell align="left">{row.id}</StyledTableCell>
              <StyledTableCell align="left">{row.variable_name}</StyledTableCell>
              <StyledTableCell align="left">{row.variable_type}</StyledTableCell>
              <StyledTableCell align="right">{row.min}</StyledTableCell>
              <StyledTableCell align="right">{row.max}</StyledTableCell>
              <StyledTableCell align="right">{row.missing_value}</StyledTableCell>
              <StyledTableCell align="right">{row.average}</StyledTableCell>
              <StyledTableCell align="right">{row.standard_deviation}</StyledTableCell>
              <StyledTableCell>
                <Switch {...SWITCH_LABEL}
                        checked={row.use}
                        onChange={handleChangeSwitch(row, idx)}
                />
              </StyledTableCell>
              <StyledTableCell>
                <Checkbox {...CHECKBOX_LABEL}
                          disabled={!row.use}
                          checked={row.target_variable}
                          onChange={handleChangeCheckbox(row, idx)}
                />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );

}
