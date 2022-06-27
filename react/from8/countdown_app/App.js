import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import { max } from "lodash";

export default function App() {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("June 13, 2022 10:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <View style={styles.Countdown}>
      <Text style={{ flex: 0.25, fontSize: 40, color: "white" }}>
        D-Day Countdown
      </Text>
      <Text style={{ flex: 0.25, fontSize: 35, color: "white" }}>
        remaining time
      </Text>
      <View style={styles.Countdown_dates}>
        <Text style={styles.Countdown_dates_date}>{timerDays}Days</Text>
        <Text style={styles.Countdown_dates_date}>{timerHours}Hours</Text>
      </View>
      <View style={styles.Countdown_dates}>
        <Text style={styles.Countdown_dates_date}>{timerMinutes}Minutes</Text>
        <Text style={styles.Countdown_dates_date}>{timerSeconds}Sec</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  Countdown: {
    paddingTop: 150,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  Countdown_dates: {
    flex: 0.5,
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Countdown_dates_date: {
    width: 150,
    height: 60,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    fontSize: 30,
    color: "white",
  },
});
