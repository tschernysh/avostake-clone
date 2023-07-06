import Config from "../config";

export const routerBook = {
    main: `${Config().DEPLOY_URL_PREFIX}/`,

    dashboard: `${Config().DEPLOY_URL_PREFIX}/app/dashboard`,
    bonuses: `${Config().DEPLOY_URL_PREFIX}/app/bonuses`,
}
