import { Ensure, equals, } from '@serenity-js/assertions'
import { actorCalled, Wait } from '@serenity-js/core'
import { By, Enter, isVisible, Key, Navigate, PageElement, Press, SelectOption, Text } from '@serenity-js/web'

describe('inicio de sesión', () => {
 it('tiene titulo', async () => {
        await actorCalled('Alejandro').attemptsTo(
            Navigate.to('http://localhost:4200/login'),
            Ensure.that(
                Text.of(PageElement.located(By.css(".form__title"))),
                equals('Iniciar sesión')
            ),
        )
 })
it('No ingresa con datos invalidos', async () => {
        await actorCalled('Alejandro').attemptsTo(
            Navigate.to('http://localhost:4200/login'),
          PageElement.located(By.id("tipoIdentificacion")).selectOptions(SelectOption.withLabel("Cédula de ciudadanía")),
         Enter.theValue("123456789").into(PageElement.located(By.id("numeroIdentificacion"))),
          Enter.theValue("123456789").into(PageElement.located(By.id("clave"))),
          Press.the(Key.Enter).in(PageElement.located(By.css(".form__button"))),
          Wait.until(PageElement.located(By.css(".swal2-popup")), isVisible()),
          Ensure.that(
            Text.of(PageElement.located(By.id("swal2-html-container"))),
            equals('La identificación no pertenece a ninguna cuenta existente.')),
  )

})
  it('No ingresa con clave invalida', async () => {
        await actorCalled('Alejandro').attemptsTo(
            Navigate.to('http://localhost:4200/login'),
          PageElement.located(By.id("tipoIdentificacion")).selectOptions(SelectOption.withLabel("Cédula de ciudadanía")),
         Enter.theValue("1001025610").into(PageElement.located(By.id("numeroIdentificacion"))),
          Enter.theValue("123456789").into(PageElement.located(By.id("clave"))),
          Press.the(Key.Enter).in(PageElement.located(By.css(".form__button"))),
          Wait.until(PageElement.located(By.css(".swal2-popup")), isVisible()),
          Ensure.that(
            Text.of(PageElement.located(By.id("swal2-html-container"))),
            equals('La clave no es válida.')),
  )

  })
  it('ingresa con datos correctos', async () => {
        await actorCalled('Alejandro').attemptsTo(
            Navigate.to('http://localhost:4200/login'),
          PageElement.located(By.id("tipoIdentificacion")).selectOptions(SelectOption.withLabel("Cédula de ciudadanía")),
         Enter.theValue("1001025610").into(PageElement.located(By.id("numeroIdentificacion"))),
          Enter.theValue("123abcDEF-").into(PageElement.located(By.id("clave"))),
          Press.the(Key.Enter).in(PageElement.located(By.css(".form__button"))),
          Wait.until(PageElement.located(By.css(".swal2-popup")), isVisible()),
          Ensure.that(
            Text.of(PageElement.located(By.id("swal2-html-container"))),
            equals('Sesión iniciada correctamente.')),
  )

    })
})
