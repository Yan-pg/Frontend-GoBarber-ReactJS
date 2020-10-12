import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPiker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment, } from './style';

import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { user, signOut  } = useAuth();

  const [selectDate, setSeletedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const handleDateChange = useCallback((day:Date, modifiers: DayModifiers) => {
    if(modifiers.available) {
      setSeletedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month : currentMonth.getMonth() + 1,
      }
    }).then(response => {
      setMonthAvailability(response.data)
    })
  }, [currentMonth, user.id])

  const disableDays = useMemo(() => {
    const dates = monthAvailability
    .filter(monthDay => monthDay.available === false)
    .map(monthDay => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();

      return new Date(year, month, monthDay.day);
    })

    return dates;
  }, [currentMonth, monthAvailability])

  return (
    <Container>
    <Header>
      <HeaderContent>
        <img src={logoImg} alt="GoBarber"/>

        <Profile>
          <img src={user.avatar_url}
           alt={user.name}
           />
           <div>
             <span>Bem-Vindo,</span>
             <strong>{user.name}</strong>
           </div>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Header>
    <Content>
      <Schedule>
      <h1>Horários agendados</h1>
      <p>
        <span>Hoje</span>
        <span>Dia 06</span>
        <span>Segunda-feira</span>
      </p>

      <NextAppointment>
        <strong>Atendimento a seguir</strong>
        <div>
          <img src="https://avatars1.githubusercontent.com/u/65233281?s=460&u=a1ca2db09724eda3482163e5d27d89ebfec5f8fc&v=4"
           alt="Yan César"
          />

          <strong>Yan César</strong>
          <span>
            <FiClock />
            08:00
          </span>
        </div>
      </NextAppointment>

      <Section>
        <strong>Manhã</strong>

        <Appointment>
          <span>
            <FiClock />
            08:00
          </span>

          <div>
            <img src="https://avatars1.githubusercontent.com/u/65233281?s=460&u=a1ca2db09724eda3482163e5d27d89ebfec5f8fc&v=4"
            alt="Yan César"
            />

            <strong>Yan César</strong>
          </div>
        </Appointment>

        <Appointment>
          <span>
            <FiClock />
            08:00
          </span>

          <div>
            <img src="https://avatars1.githubusercontent.com/u/65233281?s=460&u=a1ca2db09724eda3482163e5d27d89ebfec5f8fc&v=4"
            alt="Yan César"
            />

            <strong>Yan César</strong>
          </div>
        </Appointment>
      </Section>

      <Section>
        <strong>Tarde</strong>
        <Appointment>
          <span>
            <FiClock />
            08:00
          </span>

          <div>
            <img src="https://avatars1.githubusercontent.com/u/65233281?s=460&u=a1ca2db09724eda3482163e5d27d89ebfec5f8fc&v=4"
            alt="Yan César"
            />

            <strong>Yan César</strong>
          </div>
        </Appointment>
      </Section>
      </Schedule>
      <Calendar>
        <DayPiker
          weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
          fromMonth={new Date()}
          disabledDays={[{ daysOfWeek: [0, 6]}, ...disableDays]}
          modifiers={{
            available: { daysOfWeek: [1, 2, 3, 4, 5]}
          }}
          onMonthChange={handleMonthChange}
          onDayClick={handleDateChange}
          selectedDays={selectDate}
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',

          ]}
        />
      </Calendar>
    </Content>
  </Container>

  )
}



export default Dashboard;
