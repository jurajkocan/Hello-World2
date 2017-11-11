export const connectionString = 'mongodb://wab:wab192168@ds245805.mlab.com:45805/rep-extension'
export const instalation = `<html><head></head><body>
<form method="GET" action="https://github.com/login/oauth/authorize">

 <input name="redirect_uri" value="localhost:3000/session"><input name="clinet_id" value="6446">
<button type="submit">asd</button>
    </form>
</body></html>>`

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

export const JwtSecret: string = 'JwtSecret192168';
