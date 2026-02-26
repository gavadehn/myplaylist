/**
 * APP.JS - Custom Logic for Multiverse + Plyr
 */
(function($) {
    'use strict';

    $(function() {
        // 1. Khởi tạo Plyr cho toàn bộ class .player
        // Chúng ta dùng mảng để dễ dàng điều khiển từng player sau này
        const players = Array.from(document.querySelectorAll('.player')).map(p => new Plyr(p));

        // 2. Lắng nghe sự kiện click vào Thumbnail của Multiverse
        // Lưu ý: Chúng ta dùng sự kiện ủy quyền (delegation) để đảm bảo nó luôn hoạt động
        $(document).on('click', '.thumbnail', function(e) {
            const targetID = $(this).attr('href');
            
            // Tìm player nằm bên trong div id tương ứng
            const currentPlayer = players.find(p => {
                return $(p.elements.container).closest(targetID).length > 0;
            });

            if (currentPlayer) {
                // Chờ panel của Multiverse mở xong (khoảng 350ms) rồi mới Play
                setTimeout(() => {
                    currentPlayer.play();
                }, 350);
            }
        });

        // 3. Xử lý khi đóng viewer (Dừng nhạc/video)
        // Multiverse sử dụng class .viewer để hiển thị nội dung
        $(document).on('click', '.viewer .closer', function() {
            players.forEach(p => p.pause());
        });

        // Bonus: Nhấn phím ESC cũng dừng tất cả player (tăng trải nghiệm người dùng)
        $(document).keyup(function(e) {
            if (e.keyCode === 27) { // 27 là mã phím ESC
                players.forEach(p => p.pause());
            }
        });
    });

})(jQuery);