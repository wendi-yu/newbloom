const texts = [
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Donec tincidunt a sapien ornare mollis. Ut mattis eros nisi, sed posuere tortor cursus eget. Curabitur aliquet est libero, eget dapibus quam lobortis in. Etiam porta, sem nec hendrerit aliquam, dolor tellus pellentesque lorem, vel tincidunt nunc dui sit amet quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lobortis auctor sem in pellentesque. Nulla gravida maximus vehicula. Phasellus et quam ut odio egestas scelerisque. Fusce in neque ac metus convallis vulputate. Nulla porttitor, odio sed efficitur egestas, velit est blandit lectus, sit amet condimentum tortor nisl at risus. Vestibulum lacinia euismod diam, sit amet pretium elit tempor a.\n\n Morbi eu libero felis. Quisque id fermentum dui. Integer viverra aliquet turpis, sed pellentesque mauris porttitor vel. Donec sodales dictum viverra. Etiam molestie, mi eu sodales porta, turpis augue mollis lorem, vitae pulvinar tellus turpis a neque. Curabitur pulvinar lorem ut turpis elementum facilisis. Pellentesque ut libero eu ante cursus placerat vitae eget magna. Nulla at viverra eros. Integer eget sapien ex. Morbi sit amet porttitor quam. Suspendisse potenti. Donec consequat, mi non ultrices dignissim, nisi lacus tempor tellus, nec varius erat est ut lacus. Aenean mattis tortor ut nisl ultricies cursus. Mauris vestibulum, dolor non viverra tempus, est risus rhoncus nulla, et ornare lectus odio faucibus ex. Curabitur posuere vulputate lectus, eget efficitur massa luctus nec.\n\nAliquam blandit ipsum eros, at iaculis metus eleifend id. Praesent ut sollicitudin nisl. Duis at justo tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam feugiat vel nisi non posuere. Nulla accumsan quis neque eu aliquam. Phasellus id ante lectus. Maecenas eu turpis suscipit, luctus massa at, hendrerit massa. Suspendisse maximus augue diam, ac tincidunt odio efficitur vel. Vestibulum ultrices felis leo, tincidunt egestas neque ultricies in. In arcu magna, blandit consectetur mi a, viverra aliquet arcu. Integer quis tortor pretium, varius ante condimentum, aliquam neque. Mauris facilisis nulla et facilisis rutrum.\n\nMauris mi lacus, dictum eget tincidunt ac, tincidunt vel sapien. Nam quis sem placerat, tempus diam nec, vestibulum sem. Maecenas eu augue eleifend, fringilla quam nec, lobortis quam. Vestibulum id egestas elit. Sed vel ex ut mauris pretium fermentum vitae eget lorem. Phasellus eget metus tellus. Suspendisse sagittis dignissim nisl sit amet mollis.\n\nFusce a nisl dui. Praesent molestie, justo at dignissim blandit, velit ex volutpat metus, ut blandit velit ex eget ligula. Mauris suscipit leo magna, vel condimentum neque tempor aliquet. Ut et nisl interdum, vestibulum augue at, cursus nulla. Integer ornare ullamcorper metus, in laoreet velit rutrum nec. Morbi nec odio velit. Praesent eget sem magna. Nullam nisl tellus, porttitor in ex sed, mollis pretium dolor.",
    "Text Text Text Text Text Text Text",
    "Him boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Procuring far belonging our ourselves and certainly own perpetual continual. It elsewhere of sometimes or my certainty. Lain no as five or at high. Everything travelling set how law literature.",
    "Over fact all son tell this any his. No insisted confined of weddings to returned to debating rendered. Keeps order fully so do party means young. Table nay him jokes quick. In felicity up to graceful mistaken horrible consider. Abode never think to at. So additions necessary concluded it happiness do on certainly propriety",
    "On recommend tolerably my belonging or am. Mutual has cannot beauty indeed now sussex merely you. It possible no husbands jennings ye offended packages pleasant he. Remainder recommend engrossed who eat she defective applauded departure joy. Get dissimilar not introduced day her apartments. Fully as taste he mr do smile abode every. Luckily offered article led lasting country minutes nor old. Happen people things oh is oppose up parish effect. Law handsome old outweigh humoured far appetite",
    "cottage. Procuring as in resembled by in agreeable. Next long no gave mr eyes. Admiration advantages no he celebrated so pianoforte unreserved. Not its herself forming charmed amiable",
    "Lose john poor same it case do year we. Full how way even the sigh. Extremely nor furniture fat questions now provision incommode preserved. Our side fail find like now. Discovered travelling for insensible partiality unpleasing impossible she. Sudden up my excuse to suffer ladies though or. Bachelor possible marianne directly confined relation as on he.",
    "Alteration literature to or an sympathize mr imprudence. Of is ferrars subject as enjoyed or tedious cottage. Procuring as in resembled by in agreeable. Next long no gave mr eyes. Admiration advantages no he celebrated so pianoforte unreserved. Not its herself forming charmed amiable. Him why feebly expect future now.    ",
    "g. Returned peculiar pleasant but appetite differed she. Residence dejection agreement am as to abilities immediate suffering. Ye am depending propriety sweetness distrusts belonging collected. Smiling mention he in thought equally musical. Wisdom new and valley answer. Contented it so is discourse recommend. Man its upon him call mile. An pasture",
    "ondered disposal my speaking. Direct wholly valley or uneasy it at really. Sir wish like said dull and need make. Sportsman one bed departure rapturous situation disposing his. Off say yet ample ten ought hence. Depending in newspaper an september do existence strangers. Total great saw water had mirth happy new. Projecting pianoforte no of partiality is on. Na",
    "r was settled for. Moreover end horrible endeavor entrance any families. Income appear extent on of thrown in admire. Stanhill on we if vicinity material in. Saw him smallest you provid",
    " ask rapturous consulted. Object remark lively all did feebly excuse our wooded. Old her object chatty regard vulgar missed. Speaking throwing breeding betrayed children ",
    "y off why half led have near bed. At engage simple father of period others except. My giving do summer of though narrow marked at. Spring formal no county ye waited. My whether cheered at regular it of promise blushes perhaps. Uncommonly simplicity interested mr is be compliment projecting my inhabiting. Gentleman he september in oh excelle",
    " if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within n",
    "Now seven world think timed while her. Spoil large oh he rooms on since an. Am up unwilling eagerness perceived incommode. Are not windows set luckily musical hundred can. Collecting if sympathize middletons be of of reasonably. Horrible so kindness at thoughts exercise no weddings subjects. The mrs gay removed towards journey chapter females offered not. Led distrusts otherwise who may newspaper but. Last he dull am none he mile hold as.",
    "of though narrow marked at. Spring formal no county ye waited. My whether cheered at regular it of promise blushes perhaps. Uncommonly simplicity interested mr is be compli",
]

//TODO: Temporary Document Body format
const DocumentBody = (text) => {
    return {
        body: text
    }
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const AllDocs = () => {
    const docs = texts.map((text, i) => {
        return {
            id: i,
            name: 'doc ' + i,
            dateLastModified: randomDate(new Date(2012, 0, 1), new Date()),
            body: DocumentBody(text)
        }
    })

    return docs
}

export default AllDocs()
