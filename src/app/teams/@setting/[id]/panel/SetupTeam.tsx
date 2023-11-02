'use client'

import {
  Box,
  SelectChangeEvent,
  Stack,
  Typography,
  Button,
  TextField,
} from '@mui/material'
import { ITeam, TeamOperationForm } from '../page'
import { ChangeEvent, useState } from 'react'
import SetupSelect from './SetupSelect'
import axios from 'axios'
import useShowTeamCategory from '@/states/useShowTeamCategory'
import Image from 'next/image'

const SetupTeam = ({ team }: { team: ITeam }) => {
  const [teamInfo, setTeamInfo] = useState(team)
  const [isEdit, setIsEdit] = useState(false)
  const { setShowTeamPageCategory } = useShowTeamCategory()

  const sendTeamInfo = () => {
    console.log(teamInfo)
    if (validation()) return alert('한글, 영문, 숫자만 입력 가능합니다.')
    if (isEdit === false) return alert('변경된 사항이 없습니다.')
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/${team.team.id}`,
        teamInfo,
      )
      .then((res) => {
        if (res.status == 200) {
          console.log('서버에 저장 완료')
          setShowTeamPageCategory('메인')
          setIsEdit(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLocation1 = (event: SelectChangeEvent) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        region: [
          event.target.value,
          teamInfo.team.region[1],
          teamInfo.team.region[2],
        ],
      },
    })
  }

  const handleLocation2 = (event: SelectChangeEvent) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        region: [
          teamInfo.team.region[0],
          event.target.value,
          teamInfo.team.region[2],
        ],
      },
    })
  }

  const handleOperationForm = (event: SelectChangeEvent) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        operationForm: event.target.value as TeamOperationForm,
      },
    })
  }

  const handleDate = (event: SelectChangeEvent) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        dueTo: event.target.value,
      },
    })
  }

  const handleTeamName = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        name: event.target.value,
      },
    })
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (!event.target.files) return alert('파일이 없습니다.')
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/image/${team.team.id}`,
        formData,
      )
      .then((res) => {
        if (res.status === 200) {
          setTeamInfo({
            ...teamInfo,
            team: {
              ...teamInfo.team,
              imageUrl: res.data,
            },
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDeleteImage = () => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/image/${team.team.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          setTeamInfo({
            ...teamInfo,
            team: {
              ...teamInfo.team,
              imageUrl: null,
            },
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const validation = () => {
    // 한글, 영문, 숫자만 입력 가능
    // 2~12자리
    let check = /^[\d|a-zA-Z|가-힣]{2,12}$/

    console.log(check.test(teamInfo.team.name))

    if (check.test(teamInfo.team.name)) {
      return false
    }

    return true
  }

  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Typography fontWeight="bold">클릭한 프로젝트명 팀 설정 : </Typography>
      <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
        <Stack>
          <Typography>{team.team.type}</Typography>
          <Stack direction="row" justifyContent={'space-between'}>
            <Typography>
              {team.team.type}명: {team.team.name}
            </Typography>

            <TextField
              id="outlined-basic"
              label={`${team.team.type} 이름`}
              variant="outlined"
              value={teamInfo.team.name}
              maxRows={1}
              size="small"
              onChange={handleTeamName}
              error={validation()}
              helperText={validation() ? '다시 입력' : ''}
              inputProps={{
                style: {
                  padding: 5,
                },
              }}
            />
          </Stack>
          <Stack>
            <Image
              src={
                teamInfo.team.imageUrl
                  ? teamInfo.team.imageUrl
                  : '/images/teamLogo.png'
              }
              alt="teamLogo"
              width={100}
              height={100}
            />
            <input type="file" accept="image/*" onChange={handleImage} />
            <Button onClick={handleDeleteImage}>이미지 삭제</Button>
          </Stack>
        </Stack>
        <Stack>
          <Typography>목표 기간: </Typography>
          <SetupSelect
            type="dueTo"
            value={teamInfo.team.dueTo}
            setValue={handleDate}
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>활동 방식: </Typography>
          <SetupSelect
            type="operationForm"
            value={teamInfo.team.operationForm}
            setValue={handleOperationForm}
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>팀 활동 지역: </Typography>
          <Stack direction="row" spacing={1}>
            <SetupSelect
              type="location"
              value={teamInfo.team.region[0]}
              setValue={handleLocation1}
            />
            <SetupSelect
              type="location"
              parentLocation={teamInfo.team.region[0]}
              value={teamInfo.team.region[1]}
              setValue={handleLocation2}
            />
          </Stack>
        </Stack>
      </Box>
      <Button onClick={sendTeamInfo}>팀 설정</Button>
    </Box>
  )
}

export default SetupTeam
