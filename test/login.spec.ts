import { Ensure, equals } from '@serenity-js/assertions'
import { actorCalled } from '@serenity-js/core'
import { By, Navigate, PageElement, Text } from '@serenity-js/web'

describe('Login works', () => {
 it('has title', async () => {
        await actorCalled('Alejandro').attemptsTo(
            Navigate.to('http://localhost:4200/login'),
            Ensure.that(
                Text.of(PageElement.located(By.css(".form__title"))),
                equals('Iniciar sesión')
            ),
        )
    })
})
