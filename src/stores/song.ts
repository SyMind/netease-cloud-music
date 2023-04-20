import { writable } from 'svelte/store'
import {
  PlayListDetailInfoType,
  PlayListDetailPrivilege,
  CurrentSongInfoType,
  PlayModeType
} from '../constants/commonType'
import api from '../services/api'
import { parseLrc } from '../utils/common'

export const playListDetailInfo = writable<PlayListDetailInfoType>({
  coverImgUrl: '',
  name: '',
  playCount: 0,
  tags: [],
  creator: {
    avatarUrl: '',
    nickname: ''
  },
  tracks: [],
})

export const playListDetailPrivileges = writable<PlayListDetailPrivilege[]>([])

export function getPlayListDetail(id: string) {
  api.get('/playlist/detail', { id }).then(({ data }) => {
    let result: PlayListDetailInfoType = {
      ...data.playlist,
      tracks: data.playlist.tracks.map(item => ({
        name: item.name,
        id: item.id,
        ar: item.ar,
        al: item.al,
        copyright: item.copyright,
        song: {
          id
        }
      }))
    }
    playListDetailInfo.set(result)
    playListDetailPrivileges.set(data.privileges)
  })
}

export const currentSongInfo = writable<CurrentSongInfoType>({
  id: 0,
  name: '',
  ar: [],
  al: {
    picUrl: '',
    name: ''
  },
  url: '',
  lrcInfo: '',
  dt: 0, // 总时长，ms
  st: 0 // 是否喜欢
})

export async function getSongInfo(id: string) {
  const songDetail = await api.get('/song/detail', { ids: id })
  const songInfo = songDetail.data.songs[0]

  const songUrl = await api.get('/song/url', { id })
  songInfo.url = songUrl.data.data[0].url

  const res = await api.get('/lyric', { id })
  const lrc = parseLrc(res.data.lrc && res.data.lrc.lyric ? res.data.lrc.lyric : '');
  res.data.lrclist = lrc.now_lrc;
  res.data.scroll = lrc.scroll ? 1 : 0
  songInfo.lrcInfo = res.data

  currentSongInfo.set(songInfo)
}

export const playMode = writable<PlayModeType>('loop')

export function changePlayMode(value: PlayModeType) {
  playMode.set(value)
}
