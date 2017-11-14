
export const instalation = `<html><head></head><body>
<form method="GET" action="https://github.com/login/oauth/authorize">

 <input name="redirect_uri" value="localhost:3000/session"><input name="clinet_id" value="6446">
<button type="submit">asd</button>
    </form>
</body></html>>`

export namespace webConfig {
    const min = 1000 * 60;
    const hour = min * 60;
    export namespace SessionConfiguration {
        /**
         * Secret for generate Jwt
         */
        export const SessionSecret: string = 'SessionSecret192168';
        /**
         * Expire timeout in milliseconds
         */
        export const ExpireLoginSession: number = hour;
    }

    export namespace databaseConfiguration {
        export const connectionString = 'mongodb://wab:wab192168@ds245805.mlab.com:45805/rep-extension'
    }

    export const JwtSecret: string = 'JwtSecret192168';
    /**
     * @description ((((60 == min) * 60 == hour) * 24 == day) * 7 == week)
    */
    export const JwtExpiration: number = 60 * 60 * 24 * 7
}
