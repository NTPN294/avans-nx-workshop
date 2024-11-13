import { Component } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent {

    users: IUserInfo[] = [
        {_id: "1", name: "nick nick", emailAddress: "nick@nick.nl", role: UserRole.Admin, gender: UserGender.Male, password: "password", profileImgUrl: "data:image/webp;base64,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", isActive: true},
        {_id: "2", name: "nick2 nick2", emailAddress: "nick2@nick.nl", role: UserRole.Admin, gender: UserGender.Male, password: "password", profileImgUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExIWFRUVFRUVFRUXFRUWFRcWFhYWFhUVFRUYHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGysmHyUtLS0tLTAuKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBKwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAECAwQGB//EAEgQAAEDAgMEBgcDCgUCBwAAAAEAAhEDBBIhMQVBUWEGExQicZEyUoGhscHRQmKSFRYjU1Ryk7LS8DOCouHxB0MkNERzdMLT/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDBAAFBv/EADQRAAICAQMCAwUHAwUAAAAAAAABAhEDBBIhMUETFFEiMnGRoQUVQmGBotFSkrFTweHw8f/aAAwDAQACEQMRAD8A9JLYUhbkiQFbUcCr6dUQtLm+xhWNXyW0dFIqsOUsaizQhEKsqTnJkUBjKDrfErISxQmv0A4+pTUtABksrqZCJYlS8JozfcSUF2MIYTuTGmUQboq6jZCKyMV4lRhTQpuZCYBWsgRST4U+FC0dTGSSwpQiASSZIBcCxyma0nQSp0qYOui1tAaMkkpUUjGweZSlbnkHVZnUeBXRmu4JQfYqTLR1I4qLqaKyRfQ6WGcVbKYSwqeFSTWToqhKFKE8I2CiLQpOTgJFqAwzGyjlFgACEUMiJRVr8lHKzTgXUaosNW11IWtz0okJItorKKl1A7glhRF9oI5qgWjldTRkeKSJUmCVqIAVGKNyg6pKk+TRDjqXSmxqguKaUtD2acak2osmJPiXUGzb1iiXrK16ljQo6y/EkXLPiSxLji0uS6xVJQiAcmUixu4JsKm0JZZNo0cO9lYokJ8C0AqfVrPLUOzXHSxSMraSl1a1AAJFwUZZ5MpHFCPRFDabVXUpBNcGM1jbeiUqzTTuy3l4SXKLzTTlVm7CrZcglaVqd3UyvQqPMS0hTGQTNeE7xIRy57jSFwaRxnuZmrXICpZfjes15QcTqqKdgY0WaORp2bZYVJU0HaTA4SDkpmksGyreo0wTki7mq3mpWZXocaVGTAmhaSwKDqa2Qzxkedl0k4MqDU5CsaE7QFSyCiSFBXsCrFQJ+tU22zRFJdC5tNTyCzCsomslopZqJVcqsVEsa4BHAoEKT72k0kOe0RqCc/JTqX1EMxBwIOiEs0Y9WTWGUuhQWpYUCo9JW4nBwwtk5uMHwaN/iijdp0SYFRuk65aTroqLJFqyThJOjTC0UbcESVmo12OGIPBHEHJaW3DQBmI4yI80s5quGUxwlfJJtAK0UwNyy1Lpo+0MtVKndBwyKmpJ9y22ix9IcFW+mE7qyqqVOaO5Lqw7ZPoitwV9Fm9ZzXaNZ8lA3hkQ0YfHveWgSyzwXcaOmyvnab3HkoFZhdHeAp1K0NxHIbuJPJY8k1J8HpYsTikn1LwYUKtdA6+0TixCRlESY8Y0J5qh+0n8fcFFyRsjo5vlhp9weKrbcc0FO0H+sUu21PXKFot5SX5Bo1hvWd9FuoQ3tdT1yl2mp65XWjvKy9UK6a7F3dFBtu6ZBKc3NT1iouuKh+0U24HlZeoStC46om0GFzPbKo0cfYm/KlUfbK7qK9NJegfr0pWi2pQuZZthwdiOZiN8R4DKeaMWO0hUBjUajlxHJdtZGcXHhhGq4BYX3sFO+sht6ZQQtUFqF8CtAdK5SnWwmUTt9og71WEnElkxqSDOFIsVVK7BEjNN2oTmdVdalp0zJPRRatEy1JV1r6m2cTgACASchJVtNwcJBBB0IMjzW2GSM1weVkxyhKhoShO8gCSQBxJgeaH/AJdtxM1WiDGaLcV1FjvfQ3wp4OaTXggEQQcwRolK7gO5nA1L3IlzZcTAI70eORzWG7vqry1rHgM0BIqDPhGAe5ahcDJrAThGeW868YW/Z2yqj2DIANklxLIHtEmV4/HVo+icIPmzlq9y9pwlzSCRoxxJG8Az7yFoqvwglmkSQWOPvxIkywNVznNc3CO6DqCWnPL/AIRB1sT3TABBnQeWRTOaQqww5Zy7ekzWDE2SYAzYImZP2lstumVNoOJoJP2S3EG8Jn4LJe2duA1gBMGC4jdMxlCDXlnTJPVGYOYOXkqRhiyLlMzSnKzrr/a7aoDqTw4EYYEyDllETGZ15IlZbWZSpin1gNTgAcpmAOfivO6VlOFrH4ah1ae74Qd6m4XAf6MvYRmKbTG4Q4N09qHlo1tTBHI0en7L2z1skh7BTMFxLWg5cHfAIxVrUQzE8mDvMHXPXTdK8vodrcRTqunE7EWzl5ArrWuqubgygwNCRwIjOAozx13NUMjaC9rtag6qKTRUBNPrAS1jWluQGmc5rTRlxJlwE5CW6bt089VjtLPA4PJl+HDigDuzMRu0HkiIe5TotG6J1arKbXPe7CxgLnuO4DMlcltS3urk46ld1uw/4dCmBja3d1lQ/b4gZDTPUk9qXIqVuqJApW5a+uSQGurRipUjO5gIqHmWc1guduW5d/j0zyD2k+4p3aVIrhipPdJ8AZ3R1/7bc/jH0Vbth1x6N9V/zNa74owdo0zo6fBrz8lU/aVIa1APGW/FL7fp9Dalh9f3f8gg7KvBpfedCn9VE2F+P/WMPjQHyKMU9oUnejVpnwe0nylXIbpf9SLLFB9G/wC5/wAnPm02h+1Uv4J/qUTb7R/aqX8I/wBSPuWetXa3CCc3GBrrE+zxPJFSb/8AASxRStt/3P8AkCm32j+2U/4J/qUHWm0DrfNHhRHzKKO2hTmGuxngwF/8oIQ696RU6biwsfiBgiGyDwIBkHxCrGM30X0MuSeCHWf7n/JSdmXh1v3eykwKB2DWPpX1f2YW/JEtkXj7l2Gi2ni3NfWwOPgCzP2SjX5u3v6ul/FP9Kp4eRdv8GWWo0v9T/ccj+bJ33lz/EH0WzZtC4tHipTrvqtae/Tqd4ubvwuG+N2/xhHn7DvR/wBimfCt8i1YrmlcU/TtavizA/5hOoz7kZ5dO1w/8nUDaDXND2mWuAIPIpDvb1yHR/aLHVH24JH22NcC1zSfTYQd05jxjcuothCjOO1jRdq0PXtcpQzAZ5LogyQh99QwjJKmGiqjdFghTrXIfp8SPghdZ8hUULghyfZfIrkW7To1B3g2m6NAQ53HWTrzQr8rVxIkSIMNkcd2/wBq62lfAiDEHVQGzqIJIEE5+KCkl1QHF9mc626uH5dW4icXee4zkIy0ieSrvnVWy6o1s65sa7vTqchnquqbXayTAkIPti/DhpCZNt8IVxSQMttpVHNAOESDhyIjWI4bkWt7choBqEmMzjdmTmd6E2dYerPFHqZpwMvehJjQNmxNkNoMDu8XOEnFGR8Rkrr6k5+ZLi2NGuAg/unL3rRWuGtbiJgcIWCltqmXYJid8z7yo227BuiuC7ZlgKYc1lMgHvYy4GXb5Ela3W4Mlw3cP7hZLrblOk0NLg5zjkAQBHwQyptxzh3Wh+F2gcMh8D7ChzJieNFeyiq46LY3FxqYWHMMa2DznOFp/N1gYGsJbG4BufGZWhu1Kpzc1rGmO6SJjjkitW4a1mNxgADLUmTkABqToBnqm3SfB0djukcnfdGsX138vas9r0aqA5S4Tvz+K6t5qEtLwA0ySzFGHhMDvnkCAM/SQUXt3Ve9naKVE0yP0dMdY7CdOsxGGzwAHiqKbXcr4G6nQZtthupsxFsOOri9sydwl0+xbLK1LfSzPPNCm13F2bpwNAnTvHNxjww+EnitVYPbBOU8x8tEnDLLT7erQTLVi21tQW1E1SMT5DKLN9Ss8xTYPb7llF44b1YL6fSAPiAUVQXifQC9CNgUWMNbaFM17l9Rz8Dv0jaWI5gNksxE5kjlwXdUNsUWCGUXNHBrGNHlIQF9ZoBhgnkAJSo1mNGTCXHVznHXkNw5BF55rpRJ6WF1TZ0g6QM/V1P9H9Sn+XGalrwOMCPiuSJ35E8wPjqoPe0kY6TXRwe8fNDzGT0QJaOHowZ/1Xs33ZoCk2aYxS0gAmoYDfHKY8SvMLvo1tIVS4UHU3OMhtLq6LY07rAQAF7TWvWmDgEt0JfVJHGMjCrbdjMljCYH3sUTGIucOJ3JFqs3oifloL1AuyOjwaKPaa9WnLP0xNR7WB+GQGmpkTMZZ6Fdds3Ydpau601i8xDXVXtykZxAAGUoO65dnGDICMmHPhm4wOarqXdScnNIMTlTER7U71OSTTqK+YkdO1Ha5ya/NhzbN1SFtXbaPpisaT8HVYZxEEAy3f8AOF4pddFr0swMawNxYnOMYw4AiOsDS4NzkiYmCvTqlZxBHWTHo5gAxp9rJV4jObjEbnwc9csWfzR8xk7V9Rlpsa62cV0U6PVGB/aJeO6aRp4nFrgTmXECAMiIXq1tteGMD2PLsLQ4jBm6BJHeXOh7d73T/wC5UHjuKkCzdj/HUI/m+SZ6nK1ToK0mG20n8zojthnqVB7G/JypqbXpb8Q8WOPwBQVhEzB9tR5HkDB9oV1MM3jF4kkeRJXLUTXWhvIY5dmAum9Om7BdUCOupHMQWuezeIIk6n2ErotkO66k2oARiA1BBzE6HNXMqNboxo8AApOvCUJ5VLqWxaRwVJ8F/Un+yE4sy+RLZiYLoy4jis7C5wJkADi4A+wFY69eHMzz7w9kSfeGpVXoP4N8JldzsCqJgNcPuvaT5EygV5aPYc2lp4EEHyKPVq4Wc35jC7vN4H5cPYqxkRyYXFdQY0SJ4KfbyCFqr2wObMwd28Hgh1W3IOiNK+SV8Wja5+PNCruiSeS0trECIU6FJztxjiuXs8nSaZio0g0ZrfSeyB3UQo7JbEucAJjnz8UYGwaZzBIBAyhSeWHqcpJdyl7QdT5rO7ZdBxkspz4BEXsB3j4qvqQNzfFKmI0DLzYdB8YqTDGkZfBD7jos0gCm91JvBuc85KO1bcZ5j8ULPTBbvLvEmF2/b3FaXcHM6M05BcXuIiO+RpvgLp7eA3TSAJzIjfJ381ltahOuXIGVbQqgtnmfiUN98mnBjT5RCrJMbymHRp1PHUYxnfOJ5ac3HiZ13+albmX7sgdfELor8vbQDWxiIBcdAGjV3wS447m0U1GeWJrbRxd5bOYe+0sPH4d4ZFZsRH3hyyP0PuRG1uHhxL3Yw6CPRcGg6gsmQYDdBvPJanXOUPZMgEZNMAmRMRnppujUyumtrqJbFq5uNziBW1xpv4HI+SmHInXoCpLQxjSdMVN+fCHNyByJ0KD16BpucwmHNIBE4hmAR7II0hD2kraNGLNjytxXU1senL1iFZw4HzH1V9vtGowENDc9+p9hISpq+TRKEkvZV/QtLk2NYjUdwH4j9Eusdy8z9ELH2Gw1FEvCxl7uXmfomL3cvM/RdYdiNZcOCYuHAeSyF7uXvUS93L3o2B416GyRwHkny4BYesdy8z9E3Wu4DzP0RsXw0EJTFywda7gPxH6K61v6tM4mQDEazl7WopruLKDr2UaMStpFYKl1Uc4uIaSdc4HkGp+tdvdHgM/M/Rc2jowfdBF1UDUqk3k+iC7mNPM5Kihb4gXACAYL6jsg6JjOc89w4LQyg1xH6VzgTB6tk4cwO8SdIkzA0TwxSl0MubWYcTpvn0KKlV290eH1P09qpYZnA0uy1ALshxd/usNxeUm1XCO6Mw4kujz3Zf8AKi+/q45puljjAAyk6xx3R7FojpvVnn5PtV/gj8whUpVBqI8SPkVj66VfWuS6iDAmIg8ss/JC6L9fH5BTxW7vsGWVya/ML2tyR7M/LRdU+za8AgiHAEZbjmuKpPXW7Jql1GnG5uH8Jw/JNlXRiwGGyWtOIZndMRPFV0tkkkYjkDJzMT+9lkirJ3/FUX1Oo4RTIHIn6BQbbBOINvKFJohrnNPHETnykoazZJI/85U8v91Xf9Frqo4E1mAHXJ3uEKsdDK37SP4bj/8AZBQS/EZnCTfCKNobecDDCAN5Jj4o3setibJcXHiDI8oXOtsmvj9DUB44HfMI9syhgEBpA5mI9itKKDBtuwg6s1upCHVn9Ye64LXXses1eAso2O1mjsR8vjCi8SfNgkpNmi3tiM8ahZ3PdI5q9lmcJMkQDw3DxQFlaDKnL2XR7X2dh3Qlf5BY3BDsTTBG/L5q242zWf6T57pb6LcgciRAyPNC+uBTB6Ck10N0tJjl70Uy6rVLvS737xe74uT9rdTcwsYyng0GA5n1jJmYkcpMQqadcscHA5tMjfmOSGdJ+lGeOq7E6IAEewABUjkm+jIz0mCLuUVXxZ2bOmbgIdRYfBxb7oK5h9ZznOcSC57i5xGQk8BuG4eC8/8Azkr1amFuFmeQMyjtpfVB6UFNkc6qTBpIYFJyxQ/U6MPKl13JDaG0GnLQrUKqgelx3L+vTGuqTUUC8cF1HXE0dcmNwsxcFAuRoVyia+0pjdcljJUcSNAuJt7VyUTdclkxqJeeKNCOUTX2tMbsrGXJiU20TxYmztZUTdnismLmmLgu2A8eJ0nRu4p9XWFV7QOs0e4YSCxokTpmDmM+6FHbG16DWubS7znb6YMcnSMpBAPnxXOBwTl44LXDO4qkjxc32fCU3Jy6uyF41ryH97E4S8QMnZTEnMTKnaVMAgsxQQQS4tIjhhVbqirdUTeLJkXo8MfVmo3TyCDhzO8EnzlV08svas5qJdYgg7Uuhtq1wGZ+zx3LsOiVWbSn/n/ncvOru4BiPFd90Od/4Sn4v/ncky9BoqkHw4/3ClmP+VBhVocs7CREEyY/vlKnjbx/0tUKgUI+77wutiNIyZ66+74J2k/3CTNC2TnGZ9GRpPFuZB8Z3JU2znGGDhcNXNdwO48Qd4VNqatEtzTpknNG8/37ck7CP7+mirusmyASZaN4yc4Anug5CZ0VTKrw70HEQABDRnE4vPu5wMpGoC5QtWg76dM3VXDA790/BcXXdkunubuadVpa5kUqhJIJwth7QTkMzhJAE5ZrmnMa4AneB9toywyTnz+BGqjkxSZ6v2fqYQu77GB9WFKndlXPs2HMHeMusZu9Iz7IHPPksl1TDHENMjdmDvO8eCm8coq2erHWY8j2pc/Ajd3ruMIBSszVqhzwYAxNkagkgOE6iQ4TyK6mw2Xiw1KgkOMU6ehqnieDOe+OAJF1/tAVnANgspy1pAgHSS0bmZAAcp3rRCLhHc/0POy5VmzbI8pdQDf9H6VRkAYHgy2oNZ4Ermbi7ubV2Gs3E3c/cfHgV6FgkQh9zA7lRuNp0J1hJHJ2krRqyaZNXje2X0fxOXo7fYdQWonb7bG54PiqrnotTd3qD8P3Tm3y3IXX2HUZ6dDF95mfuEH3Kyx4pe66MM9RrMXvxteq5OmZtcHX3FWt2mwriXUmj7b6Z4O+jgpBr/s1mnxEfNHyz7EvvSP4lR23bmesl2tnrBcVircWHwd9U3aKvq+Tgu8CQfvHGztjdN9YeaiblvrDzXFdsqeofMJdvqeo5d4MvQ7z2P1O0NyOI81A3I4jzXGnaLvVconah4HyR8OXoK9XB9zsHXbRvCzVNojcJXLHaw5q+jWqP9ClUPMNMeei5wa6irMpdAzU2k7dksVa+fxPmnpbNrnNwbTH3nAnybK00NmsOry/w7rfmfeggtS+BhobRfMSZGuaJ0b52/NbaNpTAwhoE8s1kuKGFK5clo4nt5dlnbm80xum8UPqBVynUjPOKCLrseKY3ciI1Q+VLEm3E9qLWPXo3QOpNsR6tRw9zT815tTXff8ATGpNtV/+Q/8AlYll0sWb6I7BoVwq8Y9oHxVTSpTyCnaEdkusHrD4/FR6wesPIKJY31U3UN4BdQjsanSEgcTE+KD7Q22yk+k4gtLmmRhc4vY2A5jg0YWuaXNzxZTvRrRAumluDTp1RqHOxcmubhc88sTGp8Mq3cc0GWNTnGMnSb5MtTpeyYZQruPANpf/AK5+SnQ6TVHGGWVVx9UBk+QqIXcOt6lq1tucFam5vWtqVGU3VZacbmDF3gHxEwYBgZ5irKk9tRpNXs7ftVGPAc0amAxwJ0GSd8Nezdl4YMclJ76q+r54/JV/uHq/Tf0mVLRw9Jjm90HeC10uMbxBQNu26BABoVRAAyLd3i9J1pQwvM4qgfhaztNFxOUuq1HgYYnIAEuMyYElQ2dSoOwUqnV90VKlSoyoA8x6FFricDnHxgZSZDgg1Lo0vkacS00U5xlPjrT/AFv4FrNpWx/7VceHVH4vWq0u7QODjTuHAHNruownxIfMIJTtvSdDO73hS6+m5x4NLwQGzvcYOpAMQje3adDr5t+rFINa3ulsYhixaGXaenv95Smlu2r5FZeFKShHLLleq+XxNjr0VxVcXOBLm0SerIwNLQcDGH7JBbMEkiAAZMjKNI03uYSJa4tMaS0kGOWSOWrBTsxU9F73XFQbiB3KFJ3IwWOC5oFDUy5XHNE/syO3cruN8BYVRxVNdocIKHl8KHXEb1mR6rkvUrr03MOR8CmZthzcnKypcyIIWKo0HJNSJucuwTZtam7UA+RUXttXa0me1jfoueuLPgsjqdQaOTxguzM09TJe9GzqDZ2f6pn4YUHWNp6jPeuWNWoFE13qihL+r6meWpx/6a+SOnNlaeo3zP1UDZWnqN83fVc1170uven2y9fqSefE/wAC+SOiNpaD7Dfeqy20GlJh/wAgPxQQPcptaTvXU+7OWVdor5IMjadNvoU2jwAHwCqqbVqO0yWBtNaKdNJSKKc33JNa55zJKK0mQIWK2cAc1s69vEJkc1ReCs18dEjcjisdzXn5LqBvozVSqgpVCqwUaIuVkymCiSq8SItl5fAJ4AlE+iF65lBwDiJqEwCRnhaPkgV9UimeeSt2LXil/mJ+XyV8UbRi1GSmjtrPb76bpJLxwLj8UetemdE5Pa5nMZj3Zrzc3Kbrk708ZdTOtTJdD2Oy2rRq/wCHVaTwmHfh1WzLiF4k2uQQQYIzBGoR6l01uWgDuGN5aZPjmoy0sl7rKx1cX7yPTy0f8rNeW7H4SS5rmEllRhh7ZyIB3g7wpSSnFHisUZOLtGyUVJUwHc9H2vJP6J5OuKn1bj+85gJP4lm/M6k8EFjqT4Jbgqy18CSBjD9OEzGei6nAAoPqDSSMwQR6TSPRc3mPfmN6us9v20hFGePnHJp/E8vOymmo6mKrqb2nvNrUS3DrEvpF4IyHegDMcQn2fshlR4Z1riS3FDaLgMJ0l9SCz2sOoyzC77a2ym1+/PV1WRic3QTOF4nWm4Tr6OYO+cpossaXdcOue0vNV/2GDN9zVn24W8eJyWzwMVbiH3rrfc3frSA1fYVKicIY17mgY3Va0NY8yRTJaaYLoEwFS6tTZn11NpG6jSl3gHkNP+orlbnpSyuYpyKbCQ1rvSMnOq/i52p4ZDcqDtHmoSk4uoqi8X4ivJJt/E6a72g3CWUwQHHE97jNSo7PNx3akxmSTJJQoXEIU+/VDrzmoSg5O2bceeMI7Yht10q33KC9rUDdLliGeqsMdpUm3KBi6Uhdc0fDB5kOdeFAwUHbdKYvUvhsotSn1CbqIVbrcLI2+Uxertsg+JjZabYJuzhQ7WmN2EaZNuBaKATikFQblRNyjTF3RNUKWNYu080xuV21h8VG01FW+qsnaFF1ZNtJvMjWaqqq1lmNVVuemUSTyWaOsSNRZBVTGojtEeRGs1JSLoWbrQqLi5AEkplEm8iIbRryY9p+SIbOypt8/Myuc6wudzJ+OQXV0qcADgAPJasaowZpbmSlIJFqcBVM45SxpAqUBGgWe6gAKFSrCZJeEe8Z31lQ6okkuOJUKxBBEYhOGfRg+kx/3HQPAgHchHSHZwr0KtKq7E6rnUePWGbAzgxkCBpl4JJKqySS2knji3Z4VtPY1e3qFpa4wcnNBgjj/sq6dxU3td5FJJbE7XJla2vgtFyd8jxBCl2nmkkjSO3MXahxT9pHFMkhQ25ku0jikbocUkl1HbmN2kcU/aRxSSXUHcxdpHFP2rmkkhtQdzJC55p+0jimSQpHb2P2scUjdjimSR2oO5i7WOKXaxxSSXbUDcxdrCY3gSSRpA3MibxM67SSXUhXJke0qJuUkkaBbIOuHbmuPsKzVGVHHNrvDCUkkegvU6Po70ZrGKjmH7rd/ifouhGx6v6p3kUklF5mmWWCLRF2zK2nVP8AwlROya+6i/8ACUkkfMS9BfLRfcqds6sNaNT8Dvon/Jtb9S/8JSST+Yl6CeWj6n//2Q==", isActive: true},
]
}
