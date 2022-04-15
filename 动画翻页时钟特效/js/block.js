var clock = {
    $el: $('.clock'),
    clock_interval: null,
    init: function () {
        this.$ = {
            hours: this.$el.find('.clock-time.hours .figure'),
            minutes: this.$el.find('.clock-time.min .figure'),
            seconds: this.$el.find('.clock-time.sec .figure')
        };
        this.values = {
            hours: this.$.hours.parent().attr('data-init-value'),
            minutes: this.$.minutes.parent().attr('data-init-value'),
            seconds: this.$.seconds.parent().attr('data-init-value'),
        };
        this.count();
    },
    count: function () {
        var that = this,
            $hour_1 = this.$.hours.eq(0),
            $hour_2 = this.$.hours.eq(1),
            $min_1 = this.$.minutes.eq(0),
            $min_2 = this.$.minutes.eq(1),
            $sec_1 = this.$.seconds.eq(0),
            $sec_2 = this.$.seconds.eq(1);
        this.clock_interval = setInterval(function () {
            var seconds = new Date().getSeconds();
            var minutes = new Date().getMinutes();
            var hours = new Date().getHours();
            var monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            var dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            var newDate = new Date();
            $('#Date').html(newDate.getFullYear() + "年" + monthNames[newDate.getMonth()] + newDate.getDate() + "日  " + dayNames[newDate.getDay()]);
            that.checkHour(hours, $hour_1, $hour_2);
            that.checkHour(minutes, $min_1, $min_2);
            that.checkHour(seconds, $sec_1, $sec_2);
        }, 1000);
    },
    animateFigure: function ($el, value) {
        var that = this,
            $top = $el.find('.top'),
            $bottom = $el.find('.bottom'),
            $back_top = $el.find('.top-back'),
            $back_bottom = $el.find('.bottom-back');
        $back_top.find('span').html(value);
        $back_bottom.find('span').html(value);
        TweenMax.to($top, 0.8, {
            rotationX: '-180deg',
            transformPerspective: 300,
            ease: Quart.easeOut,
            onComplete: function () {
                $top.html(value);
                $bottom.html(value);
                TweenMax.set($top, { rotationX: 0 });
            }
        });
        TweenMax.to($back_top, 0.8, {
            rotationX: 0,
            transformPerspective: 300,
            ease: Quart.easeOut,
            clearProps: 'all'
        });
    },
    checkHour: function (value, $el_1, $el_2) {
        var val_1 = value.toString().charAt(0),
            val_2 = value.toString().charAt(1),
            fig_1_value = $el_1.find('.top').html(),
            fig_2_value = $el_2.find('.top').html();
        if (value >= 10) {
            if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
            if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
        }
        else {
            if (fig_1_value !== '0') this.animateFigure($el_1, 0);
            if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
        }
    }
};

clock.init();