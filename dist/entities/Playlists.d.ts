import api from "../API";
import { SoundcloudPlaylist, SoundcloudPlaylistFilter, SoundcloudPlaylistFilterV2, SoundcloudPlaylistSearchV2, SoundcloudPlaylistV2, SoundcloudSecretToken } from "../types";
export declare class Playlists {
    private readonly api;
    private readonly resolve;
    private readonly tracks;
    constructor(api: api);
    /**
     * Return playlist with all tracks fetched.
     */
    fetch: (playlist: SoundcloudPlaylistV2) => Promise<SoundcloudPlaylistV2>;
    /**
     * @deprecated use searchV2
     * Searches for playlists.
     */
    search: (params?: SoundcloudPlaylistFilter) => Promise<SoundcloudPlaylist[]>;
    /**
     * Searches for playlists using the v2 API.
     */
    searchV2: (params?: SoundcloudPlaylistFilterV2) => Promise<SoundcloudPlaylistSearchV2>;
    /**
     * @deprecated use getV2
     * Fetches a playlist from URL or ID.
     */
    get: (playlistResolvable: string | number) => Promise<any>;
    /**
     * Fetches a playlist from URL or ID using Soundcloud v2 API.
     */
    getV2: (playlistResolvable: string | number) => Promise<SoundcloudPlaylistV2>;
    /**
     * @deprecated
     * Requires Authentication - Gets the secret token from one of your playlists.
     */
    secretToken: (playlistResolvable: string | number) => Promise<SoundcloudSecretToken>;
    /**
     * Searches for playlists (web scraping)
     */
    searchAlt: (query: string) => Promise<SoundcloudPlaylistV2[]>;
    /**
     * Gets a playlist by URL (web scraping)
     */
    getAlt: (url: string) => Promise<SoundcloudPlaylistV2>;
}
