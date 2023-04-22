import { writable, derived, get } from 'svelte/store'
import {
  PlayListDetailInfoType,
  PlayListDetailPrivilege,
  CurrentSongInfoType,
  PlayModeType,
  MusicItemType
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

export const currentSongIndex = writable<number>(0)

export async function getSongInfo(id: string | number) {
  const songDetail = await api.get('/song/detail', { ids: id })
  const songInfo = songDetail.data.songs[0]

  const songUrl = await api.get('/song/url', { id })
  songInfo.url = songUrl.data.data[0].url

  const res = await api.get('/lyric', { id })
  const lrc = parseLrc(res.data.lrc && res.data.lrc.lyric ? res.data.lrc.lyric : '');
  res.data.lrclist = lrc.now_lrc;
  res.data.scroll = lrc.scroll ? 1 : 0
  songInfo.lrcInfo = res.data

  const $canPlayList = get(canPlayList)
  let nextSongIndex = $canPlayList.findIndex(item => item.id === songInfo.id)
  // let nextCanPlayList = $canPlayList.map((item, index) => {
  //   item.current = false
  //   if (nextSongIndex === index) {
  //     item.current = true
  //   }
  //   return item
  // })

  currentSongIndex.set(nextSongIndex)
  currentSongInfo.set(songInfo)
}

export const playMode = writable<PlayModeType>('loop')

export function changePlayMode(value: PlayModeType) {
  playMode.set(value)
}

export const canPlayList = derived<[typeof playListDetailInfo, typeof playListDetailPrivileges], MusicItemType[]>([playListDetailInfo, playListDetailPrivileges], ([$playListDetailInfo, $playListDetailPrivileges], set) => {
  const value: MusicItemType[] = $playListDetailInfo.tracks.filter((_, index) => {
    const privilege = $playListDetailPrivileges[index]
    if (!privilege) {
      return false
    }
    return privilege.st !== -200
  })
	set(value)
});

export const isPlaying = writable<boolean>(false)

export function updatePlayStatus(value: boolean) {
  isPlaying.set(value)
}
