const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

export const displayTime = (centiseconds) => {
  let minutes = 0;
  let seconds = 0;

if (centiseconds < 0) {
    centiseconds = 0;
  }

if (centiseconds < 100) {
    return `00:00:${padToTwo(centiseconds)}`;
  }

let remainCentiseconds = centiseconds % 100;
  seconds = (centiseconds - remainCentiseconds) / 100;

if (seconds < 60) {
    return `00:${padToTwo(seconds)}:${padToTwo(remainCentiseconds)}`;
  }

let remainSeconds = seconds % 60;
  minutes = (seconds - remainSeconds) / 60;
  
return `${padToTwo(minutes)}:${padToTwo(remainSeconds)}:${padToTwo(remainCentiseconds)}`;
};

export const displayDollars = (centiseconds, hourly, taxRate, standard) => {
  let earnedDollars = 0

  earnedDollars = (centiseconds * hourly/360000)

  if(taxRate) {
    earnedDollars = (earnedDollars - (earnedDollars * taxRate/100))
  }

  let result = ''

  if(standard){
    result = earnedDollars.toFixed(2)
  } else if(earnedDollars < 10){
    result = earnedDollars.toFixed(5)
  } else if (earnedDollars < 100) {
    result = earnedDollars.toFixed(4)
  } else if (earnedDollars < 1000) {
    result = earnedDollars.toFixed(3)
  } else if (earnedDollars < 10000) {
    result = earnedDollars.toFixed(2)
  } else if (earnedDollars < 100000) {
    result = earnedDollars.toFixed(1)
  } else if (earnedDollars < 10000000) {
    result = earnedDollars.toFixed(0)
  } else {
    result = earnedDollars
  }

  return `${result}`
}