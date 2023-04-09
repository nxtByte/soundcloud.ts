/// <reference types="node" />
/// <reference types="mocha" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import api from "../API";
import { SoundcloudTrack, SoundcloudTrackV2 } from "../types";
export declare class Util {
    private readonly api;
    private readonly playlists;
    private readonly users;
    private readonly tracks;
    constructor(api: api);
    /**
     * Gets the direct streaming link of a track.
     */
    streamLink: (songUrl: string) => Promise<string>;
    /**
     * Readable stream of m3u playlists.
     */
    private readonly m3uReadableStream;
    /**
     * Downloads the mp3 stream of a track as readable stream.
     */
    private readonly downloadTrackReadableStream;
    /**
     * Downloads the mp3 stream of a track.
     */
    private readonly downloadTrackStream;
    /**
     * Gets a track title from the page
     */
    getTitle: (songUrl: string) => Promise<string>;
    /**
     * Downloads a track on Soundcloud.
     */
    downloadTrack: (trackResolvable: string | SoundcloudTrack | SoundcloudTrackV2, dest?: string) => Promise<string>;
    /**
     * Downloads an array of tracks.
     */
    downloadTracks: (tracks: SoundcloudTrack[] | SoundcloudTrackV2[] | string[], dest?: string, limit?: number) => Promise<string[]>;
    /**
     * Downloads all the tracks from the search query.
     */
    downloadSearch: (query: string, dest?: string, limit?: number) => Promise<string[]>;
    /**
     * @deprecated
     * Downloads all of a users favorites.
     */
    downloadFavorites: (userResolvable: string | number, dest?: string, limit?: number) => Promise<string[]>;
    /**
     * Downloads all the tracks in a playlist.
     */
    downloadPlaylist: (playlistResolvable: string, dest?: string, limit?: number) => Promise<string[]>;
    /**
     * Returns a readable stream to the track.
     */
    streamTrack: (trackResolvable: string | SoundcloudTrack | SoundcloudTrackV2) => Promise<NodeJS.ReadableStream>;
    /**
     * Downloads a track's song cover.
     */
    downloadSongCover: (trackResolvable: string | SoundcloudTrack | SoundcloudTrackV2, dest?: string, noDL?: boolean) => Promise<string>;
    private static readonly removeDirectory;
}
