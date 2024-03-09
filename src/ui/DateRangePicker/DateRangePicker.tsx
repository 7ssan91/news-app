import React, { useState, useEffect } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Button } from '@mui/material';
interface DateRange {
  startDate: any,
  endDate: any,
  Key?: string,
}
interface DateRangePickerProps {
  setShowDatePicker: any,
  dateRange: DateRange,
  handleDateRange: (item: any) => void,
  setInit?: any,
  setVal?: any,
  idval?: any,
  minDate?: any,
  handleApplyDateRange: () => void
}
const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({
  setShowDatePicker,
  dateRange,
  handleDateRange,
  setInit,
  setVal,
  idval,
  minDate,
  handleApplyDateRange
}) => {
  const handleLeftAmount = () => {
    if (window.screen.width < 500) {
      return 0;
    } else {
      if (setInit) {
        return '5%';
      } else {
        return '9%';
      }
    }
  };

  const [isRight, setIsRight] = useState(false);

  useEffect(() => {
    const element = document.getElementById(idval ?? 'date-range-picker');

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const isRightValue = (elementRect.left * 100) / window.innerWidth > 44;
      setIsRight(isRightValue);
    }
  }, [idval]);

  const handleApply = () => {
    handleApplyDateRange()
    setShowDatePicker(false)
  }
  return (
    <ClickAwayListener onClickAway={() => setShowDatePicker(false)}>
      <div
        id={idval ?? 'date-range-picker'}
        style={{
          position: 'absolute',
          top: 75,
          zIndex: 3000,
          border: '1px solid #eee',
          right: isRight ? 15 : '',
        }}
      >
        <DateRangePicker
          ranges={[dateRange]}
          months={2}
          onChange={(item: any) => handleDateRange(item)}
          direction={window.screen.width < 500 ? 'vertical' : 'horizontal'}
          moveRangeOnFirstSelection={false}
          minDate={minDate}
        />
        <Button
          variant='outlined'
          color='success'
          style={{
            position: 'absolute',
            left: handleLeftAmount(),
            bottom: window.screen.width < 500 ? 0 : 10,
            padding: 6,
            fontSize: 13,
          }}
          onClick={handleApply}
          className="btn btn-success mr-1"
          type="button"
        >
          Apply
        </Button>
        {setInit && (
          <button
            style={{
              position: 'absolute',
              left: window.screen.width < 500 ? 0 : '15%',
              bottom: window.screen.width < 500 ? 0 : 10,
              padding: 6,
              fontSize: 13,
            }}
            onClick={() => {
              setInit(true);
              setVal({
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
              });
            }}
            className="btn btn-light mr-1"
            type="button"
          >
            Clear
          </button>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default DateRangePickerComponent;
