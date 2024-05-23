import { Ensure, equals } from "@serenity-js/assertions"
import { actorCalled } from "@serenity-js/core"
import { Navigate, PageElement, By,Text } from "@serenity-js/web"

describe('Pagina de ingreso', () => {
  it('tiene texto de inicio', async () => {
        await actorCalled('Alejandro').attemptsTo(
            Navigate.to('http://localhost:4200'),
            Ensure.that(
                Text.of(PageElement.located(By.css(".landing-text"))),
                equals('Controla tus finanzas, controla tu futuro.')
            ),
        )
 })
})
