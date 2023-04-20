import { writable } from 'svelte/store'
import { PlayListDetailInfoType } from '../constants/commonType'
import api from '../services/api'

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

export function getPlayListDetail({ id }: { id: string }) {
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
  })
}
