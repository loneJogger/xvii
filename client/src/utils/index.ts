export const loadFont = (name: string, url: string) => {
    const newFont = new FontFace(name, `url(${url})`)
    newFont.load()
        .then(
            (loaded) => {document.fonts.add(loaded)}
        )
        .catch((e) => e)
}